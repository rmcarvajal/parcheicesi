import React from "react";
import FeedCard from "./Feed"; // reutilizamos el mismo del feed
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // importamos el hook de navegación

interface FeedCardProps {
  nombre: string;
  tiempo: string;
  imagen: string;
  texto: string;
  autor: string;
}

const Perfil: React.FC = () => {
  const navigate = useNavigate(); // hook para manejar la navegación

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* ==================== Columna izquierda: Perfil ==================== */}
      <div className="md:w-1/3 bg-[#6C63FF] text-white flex flex-col items-center py-10 relative">
        {/* Botón de volver */}
        <button
          onClick={() => navigate(-1)} // vuelve a la página anterior
          className="absolute top-5 left-5 bg-white text-[#6C63FF] px-3 py-1 rounded shadow hover:bg-gray-100 transition"
        >
          Volver
        </button>

        {/* Icono de configuración */}
        <div className="absolute top-5 right-5 text-white text-xl cursor-pointer">
          <FaCog />
        </div>

        {/* Foto de perfil */}
        <img
          src="https://i.imgur.com/JvkkpKf.png"
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />

        {/* Nombre y descripción */}
        <h2 className="mt-4 text-xl font-semibold">María Valeria</h2>
        <p className="text-sm text-white/80">
          Student of Interactive Media Design
        </p>

        {/* Stats */}
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
      </div>

      {/* ==================== Columna derecha: Publicaciones ==================== */}
      <div className="flex-1 bg-[#E6F5EE] p-6 md:p-10">
        <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-6">
          Publicaciones
        </h2>

        <div className="max-w-3xl">
          <FeedCard
            nombre="María Valeria"
            tiempo="Hace 3 horas"
            imagen="https://i.imgur.com/z8gqcg3.png"
            texto="Detrás de cada prueba, de cada dato y cada resultado hay una pasión por comprender más. En el Día de las Lenguas Clásicas, celebramos la ciencia que nos conecta con un futuro más claro para todos."
            autor="Laura Valentina Parra"
          />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
