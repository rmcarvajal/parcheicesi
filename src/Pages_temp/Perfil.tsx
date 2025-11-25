import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PostList from "../components/Feed-components/Post-List-Component";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  updateUser,
} from "../components/features/authSlice";

import { RootState } from "../components/app/store";
import { supabase } from "../supabaseClient";

const DEFAULT_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const dskSize = useMediaQuery({ minWidth: 768 });

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.profilePic || DEFAULT_PROFILE_IMAGE
  );
  const [nombre, setNombre] = useState(currentUser?.username || "Usuario");
  const [ocupacion, setOcupacion] = useState(
    currentUser?.occupation || "Estudiante de Diseño de Medios Interactivos"
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Si no hay usuario → redirigir
  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  // 📌 Manejar cambio de foto
  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 📌 Logout completo desde Supabase
  const handleLogout = async () => {
    dispatch(logout());
    await supabase.auth.signOut();

    navigate("/login");
  };

  // 📌 Guardar los cambios en Supabase + Redux + Posts
  const handleSaveChanges = async () => {
    if (!currentUser) return;

    if (nuevaContrasena && nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // 🔹 1. Actualizar contraseña (si se cambió)
      if (nuevaContrasena) {
        const { error: passError } = await supabase.auth.updateUser({
          password: nuevaContrasena,
        });
        if (passError) throw passError;
      }

      // 🔹 2. Actualizar tabla "users" en Supabase
      const { error: updateError } = await supabase
        .from("users")
        .update({
          username: nombre,
          occupation: ocupacion,
          profile_pic: avatarUrl,
        })
        .eq("email", currentUser.email);

      if (updateError) throw updateError;

      // 🔹 3. Actualizar Redux
      await dispatch(updateUser({
        username: nombre,
        occupation: ocupacion,
        profilePic: avatarUrl,
        userId: currentUser.id, // obligatorio
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

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };

  const navBarMvl = (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
      <NavBar />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      {/* PANEL IZQUIERDO */}
      <div className="md:w-screen md:min-w-20 md:max-w-120 bg-brand text-white flex flex-col items-center py-10 md:sticky md:h-screen">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-brand px-3 py-1 rounded shadow hover:bg-brand hover:text-white cursor-pointer transition"
        >
          Volver
        </button>

        <img
          src={avatarUrl}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
        />

        <h2 className="mt-4 text-xl font-semibold">{nombre}</h2>
        <p className="text-sm text-white/80">{ocupacion}</p>

        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition"
        >
          Editar perfil
        </button>

        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* POSTS */}
      <div className="flex flex-col bg-white md:max-h-screen md:p-10 pb-20 w-full md:w-2/3">
        <h2 className="p-6 text-2xl font-semibold text-black mb-6">
          Publicaciones
        </h2>
        <div className="md:overflow-y-scroll md:max-w-3xl">
          <PostList userFilter={nombre} />
        </div>
      </div>

      {!dskSize && navBarMvl}

      {/* MODAL DE EDICIÓN */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-brand mb-6">
              Editar Perfil
            </h2>

            {/* FOTO */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Cambiar foto
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
                Subir foto
              </button>
            </div>

            {/* NOMBRE */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre
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
                Ocupación
              </label>
              <input
                type="text"
                value={ocupacion}
                onChange={(e) => setOcupacion(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* CONTRASEÑA */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            {/* CONFIRMAR */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) =>
                  setConfirmarContrasena(e.target.value)
                }
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="flex-1 bg-brand text-white py-2 rounded-lg hover:bg-brand/90"
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
