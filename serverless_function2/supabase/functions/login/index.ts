import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {

  const { email, password } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }

  return new Response(
    JSON.stringify({
      access_token: data.session?.access_token,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});
