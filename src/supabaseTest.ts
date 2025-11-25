import { supabase } from "./supabaseClient";

export async function test() {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  console.log("DATA:", data);
  console.log("ERROR:", error);
  console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

}

test();
