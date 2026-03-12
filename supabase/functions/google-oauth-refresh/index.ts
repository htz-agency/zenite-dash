import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  return new Response("google-oauth-refresh — internal only", { status: 200 });
});

export async function getValidGoogleToken(
  supabase: ReturnType<typeof createClient>,
  credential_id: string
): Promise<string> {
  const { data: cred } = await supabase
    .from("flow_credentials")
    .select("encrypted_data, is_valid")
    .eq("id", credential_id)
    .single();

  if (!cred || !cred.is_valid) throw new Error(`Credencial ${credential_id} inválida — reconecte o Google`);

  const encryptKey = Deno.env.get("CREDENTIAL_ENCRYPT_KEY")!;
  const { data: decrypted } = await supabase.rpc("decrypt_credential", {
    data: cred.encrypted_data,
    key: encryptKey,
  });

  const tokenData = JSON.parse(decrypted) as {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };

  if (tokenData.expires_at > Date.now() + 5 * 60 * 1000) {
    return tokenData.access_token;
  }

  const refreshRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: tokenData.refresh_token,
      client_id: Deno.env.get("GOOGLE_CLIENT_ID")!,
      client_secret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
      grant_type: "refresh_token",
    }),
  });

  const refreshed = await refreshRes.json();
  if (!refreshRes.ok || !refreshed.access_token) {
    await supabase.from("flow_credentials").update({ is_valid: false }).eq("id", credential_id);
    throw new Error("Token expirado — usuário precisa reconectar o Google");
  }

  const newTokenData = { ...tokenData, access_token: refreshed.access_token, expires_at: Date.now() + (refreshed.expires_in * 1000) };
  const { data: reEncrypted } = await supabase.rpc("encrypt_credential", { data: JSON.stringify(newTokenData), key: encryptKey });
  await supabase.from("flow_credentials").update({ encrypted_data: reEncrypted, is_valid: true, last_tested: new Date().toISOString() }).eq("id", credential_id);

  return refreshed.access_token;
}
