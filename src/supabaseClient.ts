// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Usamos import.meta.env para acceder a las variables de Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key in environment variables.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);
