import React, { useState, useEffect } from "react"; 
// Importa React y hooks:
// useState -> para manejar estados internos en el componente (como la foto del perfil)
// useEffect -> para ejecutar efectos secundarios, como cargar datos desde una API
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; 
import { useMediaQuery } from 'react-responsive';
// Importa el hook de React Router que permite navegar programáticamente entre páginas

import PostList from "../components/Feed-components/Post-List-Component"; 
// Importa un componente que muestra la lista de publicaciones (posts)

import { FaCog } from "react-icons/fa"; 
// Importa un icono de engranaje de la librería react-icons (para configuración)

const Perfil: React.FC = () => {
  const navigate = useNavigate(); 
  // Inicializa el hook de navegación para usarlo dentro del componente

  // Estado para la URL de la foto
  const [avatarUrl, setAvatarUrl] = useState<string>(""); 
  // avatarUrl almacena la URL de la foto de perfil
  // setAvatarUrl permite actualizarla

  // Efecto para traer foto desde una API externa
  useEffect(() => {
    async function fetchAvatar() {
      try {
        const response = await fetch("https://randomuser.me/api/"); 
        // Llama a la API que genera usuarios aleatorios
        const data = await response.json(); 
        // Convierte la respuesta en JSON para poder usarla
        const url = data.results[0].picture.large; 
        // Extrae la URL de la imagen del primer usuario devuelto
        setAvatarUrl(url); 
        // Actualiza el estado con la foto obtenida
      } catch (error) {
        console.error("Error fetching avatar:", error); 
        // Si hay un error, lo muestra en consola
      }
    }
    fetchAvatar(); 
    // Llama a la función para traer la foto cuando el componente se monta
  }, []); 
  // El arreglo vacío significa que este efecto solo se ejecuta una vez al montar el componente

  const handleLogout = () => {
    console.log("Sesión cerrada"); 
    // Solo para debug: muestra en consola que cerró sesión
    navigate("/"); 
    // Redirige a la página principal ("/") después de cerrar sesión
  };
  const dskSize = useMediaQuery({ minWidth: 768 });
  const navBarMvl = (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white">
       <NavBar />
   </div>
  );
  return (
    
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden bg-white">
      {/* Contenedor principal: flex en columna en móvil, fila en desktop (md) */}
      <div className=" md:w-screen md:min-w-20 md:max-w-120  bg-[#6C63FF] text-white flex flex-col items-center py-10 md:sticky md:top-0 md:h-screen">
        {/* Sidebar izquierdo con información del perfil */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-[#6C63FF] px-3 py-1 rounded shadow hover:bg-gray-100 transition"
        >
          Volver
        </button>
        {/* Botón para volver a la página anterior */}

        <div className="absolute top-5 right-5 text-white text-xl cursor-pointer">
          <FaCog />
        </div>
        {/* Icono de configuración arriba a la derecha */}

        {/* Foto de perfil dinámica */}
        <img
          src={avatarUrl || "https://i.imgur.com/JvkkpKf.png"} 
          // Muestra avatarUrl si existe, si no muestra la foto por defecto
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />
        {/* Clase Tailwind: ancho y alto 28, redonda, borde blanco y sombra */}

        <h2 className="mt-4 text-xl font-semibold">Jose María</h2>
        <p className="text-sm text-white/80">
          Student of Interactive Media Design
        </p>
        {/* Nombre y descripción del usuario */}

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
        {/* Estadísticas del usuario en un contenedor flex */}

        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-[#6C63FF] px-6 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Cerrar sesión
        </button>
        {/* Botón para cerrar sesión, siempre al final del sidebar gracias a mt-auto */}
      </div>

      <div className="flex flex-col bg-white  md:p-10 pb-20 w-full md:w-2/3 md:pb-10">
        {/* Contenedor principal derecho donde van las publicaciones */}
        <h2 className="p-6 text-2xl font-semibold text-black mb-6">
          Publicaciones
        </h2>
        <div className=" md:max-w-3xl max-w-lg">
          <PostList />
        </div>
        
        
      </div>
      
      {/* Navbar móvil */}
      {!dskSize && navBarMvl}
    </div>
  );
};

export default Perfil; 
// Exporta el componente para poder usarlo en otras partes de la app
