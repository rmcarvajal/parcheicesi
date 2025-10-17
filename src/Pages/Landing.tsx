import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="w-screen h-screen bg-brand flex flex-col md:flex-row md:justify-evenly justify-center items-center p-4">

    <div className="flex flex-col items-center mb-20">
      <img src="src\assets\LOGO grande fondo oscuro.png" className="w-90 mb-[30px]" />
      <h1 className="text-white text-4xl font-bold mb-6 text-center">Bienvenido a Parche Icesi</h1>
      <p className="text-white text-lg mb-10 text-center">Tu plataforma para conectar, compartir y aprender con la comunidad Icesi.</p>
      </div>

      <div className="flex flex-col gap-4">
      <NavLink to="/login">
        <button className="bg-white text-brand w-[250px] h-[50px] rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors">Iniciar Sesion</button>
      </NavLink>
      <NavLink to="/registro">
        <button className="bg-white text-brand w-[250px] h-[50px] rounded-xl font-semibold hover:bg-brand hover:text-white hover:border-2 active:bg-brand active:text-white active:border-2 border-white transition-colors">Registrarse</button>
      </NavLink>
    </div>
    </div>
  );
}

export default Landing;