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
        <h2 className="mt-4 text-xl font-semibold">Jose María</h2>
        <p className="text-sm text-white/80">Student of Interactive Media Design</p>

        {/* Botón para Editar perfil */}
        <button
          onClick={() => navigate("/editar-perfil")}
          // Cambiar "/editar-perfil" a la ruta real de tu página de edición
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
          <PostList userFilter="Usuario Actual" />
        </div>
      </div>

      {/* Navbar móvil */}
      {!dskSize && navBarMvl}
    </div>
  );
};

export default Perfil;
// Exporta el componente Perfil
