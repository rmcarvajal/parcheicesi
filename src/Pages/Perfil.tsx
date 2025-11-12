import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PostList from "../components/Feed-components/Post-List-Component";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout, updateUser } from "../components/features/authSlice";
import { updateUserPosts } from "../components/features/postSlice";

import {persistor} from "../components/app/store";
import { RootState } from "../components/app/store"; // ajusta la ruta si tu store está en otro lugar

const DEFAULT_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png";

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const dskSize = useMediaQuery({ minWidth: 768 });

  // Obtener usuario logeado desde Redux (o localStorage si no usas Redux)
  
  const currentUser = useSelector((state: RootState) => state.auth.user)

  const [avatarUrl, setAvatarUrl] = useState<string>(
    currentUser?.profilePic || DEFAULT_PROFILE_IMAGE
  );
  const [nombre, setNombre] = useState<string>(currentUser?.username || "Usuario");
  const [ocupacion, setOcupacion] = useState<string>(
    currentUser?.occupation || "Estudiante de Diseño de Medios Interactivos"
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  // Navbar móvil
  const navBarMvl = (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
      <NavBar />
    </div>
      <NavBar />
    </div>
  );

  // Manejar cambio de foto (base64)
  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
  dispatch(logout()); // 🔹 Limpia el usuario del estado
  persistor.flush(); // 🔹 Asegura que el cambio se guarde
  navigate("/login"); // 🔹 Redirige al login
};

  const handleSaveChanges = () => {
  if (nuevaContrasena && nuevaContrasena !== confirmarContrasena) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (!currentUser) return;

  // 🔹 Guardar los valores antiguos y nuevos
  const oldUsername = currentUser.username;
  const newProfilePic = avatarUrl;
  const newUsername = nombre;

  // 🔹 Actualizar usuario en auth
  dispatch(updateUser({
    username: newUsername,
    occupation: ocupacion,
    profilePic: newProfilePic,
    ...(nuevaContrasena ? { password: nuevaContrasena } : {}),
  }));

  // 🔹 Actualizar los posts del usuario
  dispatch(updateUserPosts({
    oldUsername,
    newUsername,
    newProfilePic,
  }));

  alert("✅ Cambios guardados correctamente");

  setShowEditModal(false);
  setNuevaContrasena("");
  setConfirmarContrasena("");
};

useEffect(() => {
  if (!currentUser) {
    navigate("/login");
  }
}, [currentUser, navigate]);


  const handleCancelEdit = () => {
    setShowEditModal(false);
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };

  const dispatch = useDispatch();
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full w-full overflow-hidden bg-white">
      {/* Panel lateral */}
      <div className="md:w-screen md:min-w-20 md:max-w-120 bg-brand text-white flex flex-col items-center py-10 md:sticky md:h-screen md:justify-start">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-brand px-3 py-1 rounded shadow hover:bg-brand hover:text-white hover:border-white cursor-pointer transition"
        >
          Volver
        </button>

        

        <img
          src={avatarUrl || DEFAULT_PROFILE_IMAGE}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
        />
          className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
        />

        <h2 className="mt-4 text-xl font-semibold">{nombre}</h2>
        <p className="text-sm text-white/80">{ocupacion}</p>

        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition hover:border-white cursor-pointer"
        >
          Editar perfil
        </button>
        <h2 className="mt-4 text-xl font-semibold">{nombre}</h2>
        <p className="text-sm text-white/80">{ocupacion}</p>

        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition hover:border-white cursor-pointer"
        >
          Editar perfil
        </button>

        <div className="flex justify-around w-full mt-6">
          <div className="text-center">
            <p className="text-lg font-semibold">6.2k</p>
            <p className="text-xs text-white/80">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">125</p>
            <p className="text-xs text-white/80">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">25</p>
            <p className="text-xs text-white/80">Projects</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition hover:border-white cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Sección de publicaciones */}
      <div className="flex flex-col bg-white md:max-h-screen md:p-10 pb-20 w-full md:w-2/3 md:pb-10">
        <h2 className="p-6 text-2xl font-semibold text-black mb-6">Publicaciones</h2>
        <div className="md:overflow-y-scroll md:max-w-3xl max-w-full">
          <PostList userFilter={nombre} />
        </div>
      </div>


      {!dskSize && navBarMvl}

      {/* Modal de edición */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-brand mb-6">Editar Perfil</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Cambiar foto</label>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChangePhoto}
              />

              <button
                type="button"
                onClick={() => document.getElementById("fileInput")?.click()}
                className="bg-brand text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-brand/90 transition"
              >
                Subir foto
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Ocupación</label>
              <input
                type="text"
                value={ocupacion}
                onChange={(e) => setOcupacion(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelEdit}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChanges}
                className="flex-1 bg-brand text-white font-semibold py-2 px-4 rounded-lg hover:bg-brand/90 transition"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
export default Perfil;
