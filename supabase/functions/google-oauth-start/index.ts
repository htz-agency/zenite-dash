import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const org_id = url.searchParams.get("org_id");
  const user_id = url.searchParams.get("user_id");
  const credential_name = url.searchParams.get("name") ?? "Google Workspace";

  if (!org_id || !user_id) {
    return new Response("org_id e user_id são obrigatórios", { status: 400 });
  }

  const clientId = Deno.env.get("GOOGLE_CLIENT_ID")!;
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const callbackUrl = `${supabaseUrl}/functions/v1/google-oauth-callback`;
  const state = btoa(JSON.stringify({ org_id, user_id, credential_name }));

  const scopes = [
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/documents",
    "openid", "email", "profile",
  ].join(" ");

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", callbackUrl);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  return Response.redirect(authUrl.toString(), 302);
});
