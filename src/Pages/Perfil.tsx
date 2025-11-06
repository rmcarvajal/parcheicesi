import React, { useState, useEffect } from "react";
// React y hooks
import NavBar from "../components/Navbar";
// Componente de navegación
import { useNavigate } from "react-router-dom";
// Hook de React Router para navegar programáticamente
import { useMediaQuery } from 'react-responsive';
// Hook para detectar tamaño de pantalla

import PostList from "../components/Feed-components/Post-List-Component";
// Componente que muestra la lista de publicaciones
import { FaCog } from "react-icons/fa";
// Icono de engranaje para configuración

const Perfil: React.FC = () => {
  const navigate = useNavigate();
  // Hook para navegación

  // Estado para la URL del avatar
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  
  // Estados para el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);
  const [nombre, setNombre] = useState("Jose María");
  const [ocupacion, setOcupacion] = useState("Student of Interactive Media Design");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  // Detectar si estamos en pantalla de escritorio
  const dskSize = useMediaQuery({ minWidth: 768 });

  // Navbar móvil (solo se muestra en pantallas pequeñas)
  const navBarMvl = (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
       <NavBar />
    </div>
  );

  // Efecto para traer foto de perfil de API externa
  useEffect(() => {
    async function fetchAvatar() {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const url = data.results[0].picture.large;
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    }
    fetchAvatar();
  }, []); // Se ejecuta solo al montar el componente

  // Función para cerrar sesión
  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login");
  };

  // Función para guardar cambios del perfil
  const handleSaveChanges = () => {
    if (nuevaContrasena && nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // Aquí guardarías los cambios en tu backend
    console.log("Guardando cambios:", { nombre, ocupacion, nuevaContrasena });
    
    // Cerrar modal
    setShowEditModal(false);
    
    // Limpiar contraseñas
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full w-full overflow-hidden bg-white">
      {/* Sidebar izquierdo */}
      <div className="md:w-screen md:min-w-20 md:max-w-120 bg-brand text-white flex flex-col items-center py-10 md:sticky md:h-screen md:justify-start">
        
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-brand px-3 py-1 rounded shadow hover:bg-brand hover:text-white hover:border-white cursor-pointer transition"
        >
          Volver
        </button>

        {/* Icono de configuración */}
        <div className="absolute top-5 right-5 text-white text-xl cursor-pointer">
          <FaCog />
        </div>

        {/* Foto de perfil */}
        <img
          src={avatarUrl || "https://i.imgur.com/JvkkpKf.png"}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />

        {/* Nombre y descripción */}
        <h2 className="mt-4 text-xl font-semibold">{nombre}</h2>
        <p className="text-sm text-white/80">{ocupacion}</p>

        {/* Botón para Editar perfil */}
        <button
          onClick={() => setShowEditModal(true)}
          className="mt-4 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition hover:border-white cursor-pointer"
        >
          Editar perfil
        </button>

        {/* Estadísticas del usuario */}
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

        {/* Botón para cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-brand border-2 border-brand font-medium px-6 py-2 rounded shadow hover:bg-brand hover:text-white transition hover:border-white cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenedor principal derecho (posts) */}
      <div className="flex flex-col bg-white md:max-h-screen md:p-10 pb-20 w-full md:w-2/3 md:pb-10">
        <h2 className="p-6 text-2xl font-semibold text-black mb-6">
          Publicaciones
        </h2>
        <div className="md:overflow-y-scroll md:max-w-3xl max-w-lg">
      <PostList />     
        </div>
      </div>

      {/* Navbar móvil */}
      {!dskSize && navBarMvl}

      {/* Modal de Edición de Perfil */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-brand mb-6">Editar Perfil</h2>
            
            {/* Campo Nombre */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>

            {/* Campo Ocupación */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Ocupación</label>
              <input
                type="text"
                value={ocupacion}
                onChange={(e) => setOcupacion(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
                placeholder="Tu ocupación"
              />
            </div>

            {/* Campo Nueva Contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
                placeholder="Dejar vacío para no cambiar"
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
                placeholder="Confirmar nueva contraseña"
              />
            </div>

            {/* Botones de acción */}
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
// Exporta el componente Perfil