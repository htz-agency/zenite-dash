import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const appUrl = Deno.env.get("APP_URL") ?? "https://zenite.htz.agency";

  if (error || !code || !state) {
    return Response.redirect(`${appUrl}/credenciais?erro=google_oauth_cancelado`, 302);
  }

  let stateData: { org_id: string; user_id: string; credential_name: string };
  try {
    stateData = JSON.parse(atob(state));
  } catch {
    return Response.redirect(`${appUrl}/credenciais?erro=state_invalido`, 302);
  }

  const clientId = Deno.env.get("GOOGLE_CLIENT_ID")!;
  const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET")!;
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const callbackUrl = `${supabaseUrl}/functions/v1/google-oauth-callback`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: callbackUrl, grant_type: "authorization_code" }),
  });

  const tokens = await tokenRes.json();
  if (!tokenRes.ok || !tokens.access_token) {
    return Response.redirect(`${appUrl}/credenciais?erro=token_exchange_falhou`, 302);
  }

  const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const profile = await profileRes.json();

  const supabase = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const encryptKey = Deno.env.get("CREDENTIAL_ENCRYPT_KEY")!;

  const credentialData = {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    expires_at: Date.now() + (tokens.expires_in * 1000),
    scope: tokens.scope,
  };

  const { data: encrypted } = await supabase.rpc("encrypt_credential", {
    data: JSON.stringify(credentialData),
    key: encryptKey,
  });

  await supabase.from("flow_credentials").upsert({
    org_id: stateData.org_id,
    name: stateData.credential_name,
    type: "googleWorkspace",
    encrypted_data: encrypted,
    meta: {
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      google_sub: profile.sub,
      scopes: tokens.scope?.split(" ") ?? [],
      connected_at: new Date().toISOString(),
    },
    is_valid: true,
    last_tested: new Date().toISOString(),
  }, { onConflict: "org_id,type" });

  return Response.redirect(`${appUrl}/credenciais?sucesso=google_conectado&email=${encodeURIComponent(profile.email)}`, 302);
});
