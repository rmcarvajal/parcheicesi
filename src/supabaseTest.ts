import { supabase } from "./supabaseClient";

// Función de prueba para verificar que Supabase está funcionando correctamente.
// La idea es traer 1 registro de la tabla "users" y mostrar qué devuelve Supabase.
export async function test() {

  // Hacemos una consulta a la tabla "users".
  // select("*") → pide todas las columnas.
  // limit(1) → solo trae un registro para evitar cargar demasiado.
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1);

  // Mostramos en consola el resultado de la consulta:
  // "data" debería contener un array con 1 usuario o un array vacío.
  console.log("DATA:", data);

  // "error" mostrará si hubo algún problema con la consulta:
  // permisos, tabla inexistente, credenciales incorrectas, etc.
  console.log("ERROR:", error);

  // Mostramos la URL de Supabase desde las variables de entorno,
  // para confirmar que Vite sí las está leyendo correctamente.
  console.log("URL:", import.meta.env.VITE_SUPABASE_URL);

  // Mostramos también la anon key para verificar que llega desde Vite.
  console.log("KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

}

// Ejecutamos la función apenas se importe el archivo.
// Esto sirve para debug durante desarrollo.
test();
