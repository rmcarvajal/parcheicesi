import { supabase } from "./supabaseClient";

// REGISTRO
export async function signUp(email: string, password: string, username: string) {
  const { data: authData, error: authError } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (authError) throw authError;

  const userId = authData.user?.id;
  if (!userId) throw new Error("No se pudo obtener el user ID.");

  // Crear registro en la tabla users
  const { error: insertError } = await supabase.from("users").insert({
    id: userId,
    email,
    username,
    occupation: "Estudiante de Diseño de Medios Interactivos",
    profile_pic: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
  });

  if (insertError) throw insertError;

  return authData.user;
}

// LOGIN
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

// LOGOUT
export async function signOut() {
  await supabase.auth.signOut();
}

// OBTENER DATOS COMPLETOS (tabla users)
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  if (error) throw error;
  return data;
}
