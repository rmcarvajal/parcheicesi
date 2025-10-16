import React from "react"; 
// Importa React, necesario para definir componentes funcionales en JSX.

import { useNavigate } from "react-router-dom"; 
// Importa el hook `useNavigate` de React Router, que permite navegar entre rutas programáticamente.

import PostList from "../components/Feed-components/Post-List-Component"; 
// Importa el componente `PostList`, que probablemente renderiza una lista de publicaciones.

import { FaCog } from "react-icons/fa"; 
// Importa el icono de configuración (engranaje) desde la librería `react-icons`.

const Perfil: React.FC = () => { 
  // Define un componente funcional de React llamado `Perfil`. 
  // `React.FC` indica que es un Functional Component con tipado de TypeScript.

  const navigate = useNavigate(); 
  // Inicializa el hook `useNavigate` para poder cambiar de página desde eventos.

  const handleLogout = () => { 
    // Función que se ejecuta al cerrar sesión.
    console.log("Sesión cerrada"); 
    // Solo imprime un mensaje en la consola (podría reemplazarse con lógica real de logout).
    navigate("/"); 
    // Redirige al usuario a la ruta principal "/".
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Contenedor principal: usa Flexbox, columna en móviles y fila en pantallas medianas en adelante, con altura mínima de pantalla y fondo blanco */}

      {/* ==================== Columna izquierda: Perfil (Estática) ==================== */}
      <div className="md:w-1/3 bg-[#6C63FF] text-white flex flex-col items-center py-10 relative md:sticky md:top-0 md:h-screen">
        {/* Columna izquierda:
            - Ocupa 1/3 de ancho en pantallas medianas.
            - Fondo morado, texto blanco.
            - Flex vertical, centrado.
            - Padding vertical.
            - Posición relativa para colocar elementos absolutos dentro.
            - Sticky para que quede fija al hacer scroll en pantallas md+.
        */}

        {/* Botón de volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 bg-white text-[#6C63FF] px-3 py-1 rounded shadow hover:bg-gray-100 transition"
        >
          Volver
        </button>
        {/* Botón absoluto en la esquina superior izquierda para volver a la página anterior */}

        {/* Icono de configuración */}
        <div className="absolute top-5 right-5 text-white text-xl cursor-pointer">
          <FaCog />
        </div>
        {/* Icono de configuración en la esquina superior derecha */}

        {/* Foto de perfil */}
        <img
          src="https://i.imgur.com/JvkkpKf.png"
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />
        {/* Imagen de perfil circular con borde blanco y sombra */}

        {/* Nombre y descripción */}
        <h2 className="mt-4 text-xl font-semibold">María Valeria</h2>
        <p className="text-sm text-white/80">
          Student of Interactive Media Design
        </p>
        {/* Nombre del usuario y descripción breve */}

        {/* Stats del usuario */}
        <div className="flex justify-around w-full mt-6">
          {/* Contenedor para estadísticas (Likes, Followers, Projects), con distribución equitativa */}
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

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-auto mb-5 bg-white text-[#6C63FF] px-6 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Cerrar sesión
        </button>
        {/* Botón que ejecuta `handleLogout`. `mt-auto` empuja el botón hacia el final de la columna */}
      </div>

      {/* ==================== Columna derecha: Publicaciones ==================== */}
      <div className="flex-1 bg-[#E6F5EE] p-6 md:p-10">
        {/* Contenedor principal de la columna derecha:
            - Ocupa todo el espacio restante (`flex-1`)
            - Fondo verde claro
            - Padding adaptable
        */}
        <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-6">
          Publicaciones
        </h2>
        {/* Título de la sección de publicaciones */}

        <div className="max-w-3xl">
          <PostList />
        </div>
        {/* Contenedor de la lista de publicaciones */}
      </div>
    </div>
  );
};

export default Perfil;
// Exporta el componente para usarlo en otras partes de la aplicación
