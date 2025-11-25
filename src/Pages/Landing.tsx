import { NavLink } from "react-router-dom";
import Logo from "../assets/LOGO grande fondo oscuro.png";

function Landing() {
  return (
    <div className="w-screen min-h-screen bg-brand flex flex-col md:flex-row md:justify-evenly justify-center items-center p-6 md:p-12">

      <div className="flex flex-col items-center mb-10 md:mb-0 px-4 md:px-0 max-w-md md:max-w-lg">
        <img src={Logo} className="w-40 sm:w-48 md:w-64 lg:w-80 mb-6" />
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center">Bienvenido a Parche Icesi</h1>
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 md:mb-10 text-center">Tu plataforma para conectar, compartir y aprender con la comunidad Icesi.</p>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <NavLink to="/login">
          <button className="bg-white text-brand w-56 sm:w-64 md:w-72 h-12 md:h-14 rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">Iniciar Sesion</button>
        </NavLink>
        <NavLink to="/registro">
          <button className="bg-white text-brand w-56 sm:w-64 md:w-72 h-12 md:h-14 rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">Registrarse</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;