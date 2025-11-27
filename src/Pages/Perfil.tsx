// Importamos React y hooks básicos
import React, { useState, useEffect } from "react";

// Barra de navegación inferior
import NavBar from "../components/Navbar";

// Hook para redireccionar entre pantallas
import { useNavigate } from "react-router-dom";

// Hook para detectar tamaño de pantalla (responsividad)
import { useMediaQuery } from "react-responsive";

// Componente que muestra las publicaciones hechas por el usuario
import PostList from "../components/Feed-components/Post-List-Component";

// Estado global de Redux
import { useSelector, useDispatch } from "react-redux";
import {
  logout,        // Acción para cerrar sesión
  updateUser,    // Acción para actualizar los datos del usuario en Redux
} from "../components/features/authSlice";

import { RootState } from "../components/app/store"; // Tipado del estado global
import { supabase } from "../supabaseClient";        // Cliente Supabase

// Imagen por defecto para el perfil
const DEFAULT_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";


// =========================
// COMPONENTE PRINCIPAL
// =========================
const Perfil: React.FC = () => {
  const navigate = useNavigate();      // Para redirigir
  const dispatch = useDispatch<any>(); // Para ejecutar acciones Redux

  // Detectar si estamos en pantalla >= 768px
  const dskSize = useMediaQuery({ minWidth: 768 });

  // Obtener usuario desde Redux
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Estados locales del formulario de edición
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.profilePic || DEFAULT_PROFILE_IMAGE
  );
  const [nombre, setNombre] = useState(currentUser?.username || "Usuario");
  const [ocupacion, setOcupacion] = useState(
    currentUser?.occupation || "Interctive Media Design Student"
  );

  // Estados del modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [loading, setLoading] = useState(false);


  // ===========================================================
  // REDIRECCIÓN AUTOMÁTICA SI NO HAY USUARIO AUTENTICADO
  // ===========================================================
  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);


  // ===========================================================
  // CAMBIAR FOTO DE PERFIL (PREVISUALIZACIÓN LOCAL)
  // ===========================================================
  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Guardamos la previsualización como base64
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };


  // ===========================================================
  // LOGOUT COMPLETO → SUPABASE + REDUX
  // ===========================================================
  const handleLogout = async () => {
    dispatch(logout());               // Borramos datos en Redux
    await supabase.auth.signOut();    // Cerramos sesión en Supabase
    navigate("/login");               // Redirigir
  };


  // ===========================================================
  // GUARDAR CAMBIOS: Supabase + Redux
  // ===========================================================
  const handleSaveChanges = async () => {
    if (!currentUser) return;

    // Validar contraseñas
    if (nuevaContrasena && nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Actualizar contraseña si fue cambiada
      if (nuevaContrasena) {
        const { error: passError } = await supabase.auth.updateUser({
          password: nuevaContrasena,
        });
        if (passError) throw passError;
      }

      // 2️⃣ Actualizar datos del usuario en la tabla "users"
      const { error: updateError } = await supabase
        .from("users")
        .update({
          username: nombre,
          occupation: ocupacion,
          profile_pic: avatarUrl,
        })
        .eq("email", currentUser.email);

      if (updateError) throw updateError;

      // 3️⃣ Actualizar Redux
      await dispatch(updateUser({
        username: nombre,
        occupation: ocupacion,
        profilePic: avatarUrl,
        userId: currentUser.id, // Obligatorio para mantener relación
      }));

      alert("✅ Cambios guardados correctamente");
      setShowEditModal(false);
      setNuevaContrasena("");
      setConfirmarContrasena("");

    } catch (err: any) {
      alert("Error al guardar cambios: " + err.message);
    }

    setLoading(false);
  };


  // ===========================================================
  // CANCELAR MODAL
  // ===========================================================
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };


  // ===========================================================
  // NAVBAR MÓVIL
  // ===========================================================
  const navBarMvl = (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
      <NavBar />
    </div>
  );


  // ===========================================================
  // JSX DEL COMPONENTE
  // ===========================================================
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">

      {/* PANEL IZQUIERDO → Perfil y acciones */}
      <div className="md:w-screen md:min-w-20 md:max-w-120 bg-brand text-white flex flex-col items-center py-10 md:sticky md:h-screen">

        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-brand px-3 py-1 rounded shadow hover:bg-brand hover:text-white transition"
        >
          Return
        </button>

        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
        />

        {/* Nombre y ocupación */}
        <h2 className="mt-4 text-xl font-semibold">{nombre}</h2>
        <p className="text-sm text-white/80">{ocupacion}</p>

        {/* Botón editar */}
        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition"
        >
          Edit profile
        </button>

        {/* Botón logout */}
        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition"
        >
          Log out
        </button>
      </div>


      {/* PANEL PRINCIPAL → Publicaciones */}
      <div className="flex flex-col bg-white md:max-h-screen md:p-10 pb-20 w-full md:w-2/3">
        <h2 className="p-6 text-2xl font-semibold text-black mb-6">
          Posts
        </h2>

        {/* Lista de posts filtrados por nombre */}
        <div className="md:overflow-y-scroll md:max-w-3xl">
          <PostList userFilter={nombre} />
        </div>
      </div>


      {/* Navbar móvil si NO hay pantalla grande */}
      {!dskSize && navBarMvl}


      {/* =====================================================
          MODAL DE EDICIÓN
         ===================================================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">

            <h2 className="text-2xl font-bold text-brand mb-6">
              Edit profile
            </h2>

            {/* FOTO */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Change image
              </label>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChangePhoto}
              />

              <button
                onClick={() =>
                  document.getElementById("fileInput")?.click()
                }
                className="bg-brand text-white px-4 py-2 rounded-lg shadow hover:bg-brand/90"
              >
                Upload image
              </button>
            </div>

            {/* NOMBRE */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* OCUPACIÓN */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Occupation
              </label>
              <input
                type="text"
                value={ocupacion}
                onChange={(e) => setOcupacion(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* NUEVA CONTRASEÑA */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                New password
              </label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* BOTONES */}
            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="flex-1 bg-brand text-white py-2 rounded-lg hover:bg-brand/90"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
