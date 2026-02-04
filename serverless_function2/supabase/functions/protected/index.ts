import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async(req)=>{

  const authHeader = req.headers.get("Authorization");

  if(!authHeader){
    return new Response("Missing Authentication Header", {status:401});
  }

  const token= authHeader.replace("Bearer " ,"");

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("coM_SUPABASE_ANON_KEY")?? ""
  );

  const result= await supabase.auth.getUser(token);
  const user = result.data.user;
  const error = result.error;

  if(error || !user){
    return new Response("User not authenticated", {status:401});
  }

  return new Response(
    JSON.stringifY({
      message:"Your authenitcated",
      email: user.email,
      id:user.id
    }),
    {headers:{"Content-Type": "application/json"}}
  );


})
