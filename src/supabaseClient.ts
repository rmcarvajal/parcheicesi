// src/supabaseClient.ts

// Importamos la función createClient desde la librería oficial de Supabase.
// Esta función es la que nos permite inicializar la conexión con nuestra base de datos.
import { createClient } from '@supabase/supabase-js'

// Obtenemos la URL del proyecto de Supabase desde las variables de entorno de Vite.
// "import.meta.env" es la forma estándar en Vite para acceder a variables definidas en .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

// Obtenemos la key pública (anon key) necesaria para que el cliente pueda conectarse a Supabase.
// También viene desde las variables de entorno de Vite.
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validamos que ambas variables existan. Si por algún motivo no están definidas,
// lanzamos un error para avisarte inmediatamente durante la ejecución.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key in environment variables.")
}

// Creamos el cliente de Supabase usando la URL y el anon key. Este será el objeto
// que usarás en toda tu aplicación para hacer consultas, inserciones, logins, etc.
// El segundo parámetro es la configuración opcional para la autenticación.
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      // Guarda la sesión en el navegador para que no tengas que hacer login cada vez
      persistSession: true,

      // Renueva automáticamente el token cuando esté por expirar
      autoRefreshToken: true,

      // Detecta si la sesión viene incrustada en la URL (por ejemplo, después de un login mágico)
      detectSessionInUrl: true,
    }
  }
);
