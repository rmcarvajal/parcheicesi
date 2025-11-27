// Importa NavLink para navegar entre rutas sin recargar la página
import { NavLink } from "react-router-dom";
// Importa el logo para mostrarlo en la pantalla de bienvenida
import Logo from "../assets/LOGO grande fondo oscuro.png";

function Landing() {
  return (
    // Contenedor principal: ocupa toda la pantalla, fondo de color brand,
    // diseño flex responsivo (columna en móvil, fila en pantallas medianas)
    <div className="w-screen min-h-screen bg-brand flex flex-col md:flex-row md:justify-evenly justify-center items-center p-6 md:p-12">

      {/* Sección izquierda: logo + textos */}
      <div className="flex flex-col items-center mb-10 md:mb-0 px-4 md:px-0 max-w-md md:max-w-lg">
        {/* Logo principal adaptado a tamaños responsivos */}
        <img src={Logo} className="w-40 sm:w-48 md:w-64 lg:w-80 mb-6" />

        {/* Título de bienvenida */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">
          Welcome to Parche Icesi
        </h1>

        {/* Descripción corta de la plataforma */}
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 md:mb-10 text-center">
          Your platform to connect, share and learn with the Icesi community.
        </p>
      </div>

      {/* Sección derecha: botones de navegación */}
      <div className="flex flex-col gap-4 px-4">

        {/* Botón para ir a la página de inicio de sesión */}
        <NavLink to="/login">
          <button className="bg-white text-brand w-56 sm:w-64 md:w-72 h-12 md:h-14 rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
            Log in
          </button>
        </NavLink>

        {/* Botón para ir a la página de registro */}
        <NavLink to="/registro">
          <button className="bg-white text-brand w-56 sm:w-64 md:w-72 h-12 md:h-14 rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
            Sign up
          </button>
        </NavLink>

      </div>
    </div>
  );
}

export default Landing;
