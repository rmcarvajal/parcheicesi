// Importa hooks de React para manejar estados locales
import { useState } from "react";
// Importa funciones de Redux para despachar acciones y leer el estado global
import { useDispatch, useSelector } from "react-redux";
// Importa navegación y enlaces de React Router
import { useNavigate, NavLink } from "react-router-dom";
// Importa la acción de login desde el slice de autenticación
import { login } from "../components/features/authSlice";
// Importa el tipo RootState para tipar el selector
import { RootState } from "../components/app/store";

// Iconos e imágenes
import person from "../assets/person-fill.svg";
import lock from "../assets/lock.svg";
import hidden from "../assets/hidden.svg";
import shown from "../assets/shown.svg";
import Logo from "../assets/LOGO grande.png";

function Login() {
  // Estado local para email y contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado que controla si la contraseña se ve o no
  const [showpass, setShowpass] = useState("password");

  // Permite disparar acciones de Redux
  const dispatch = useDispatch<any>();

  // Hook para navegar entre rutas
  const navigate = useNavigate();

  // Extrae loading y error del estado global de autenticación
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Maneja el envío del formulario de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene recargar la página

    // Envía la acción login con email y contraseña
    const result = await dispatch(login({ email, password }));

    // Si la acción fue exitosa, redirige al feed
    if (login.fulfilled.match(result)) {
      navigate("/feed");
    }
  };

  return (
    // Contenedor principal centrado
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">

      {/* Tarjeta blanca del formulario */}
      <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-4 py-5 justify-around items-center md:w-125">

        {/* Logo superior */}
        <img src={Logo} className="w-43 h-30.5" alt="Logo" />

        {/* Mensaje de error desde Redux */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Formulario de inicio de sesión */}
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col justify-center items-center gap-4"
        >
          {/* Campo de email */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            {/* Icono */}
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={person} className="w-5 h-5" />
            </div>

            {/* Input del email */}
            <input
              type="email"
              placeholder="Correo"
              className="pl-3 max-w-45"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            {/* Icono */}
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>

            {/* Input de contraseña, visible o no según showpass */}
            <input
              type={showpass}
              placeholder="Contraseña"
              className="pl-3 max-w-45"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Icono para mostrar/ocultar contraseña */}
            <img
              src={showpass === "password" ? hidden : shown}
              className="w-5 h-5 cursor-pointer mr-2"
              onClick={() =>
                setShowpass((v) => (v === "password" ? "text" : "password"))
              }
            />
          </div>

          {/* Botón de login */}
          <button
            type="submit"
            className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* Texto de registro */}
        <p className="text-gray-400 text-center">¿No tienes una cuenta?</p>

        {/* Botón que redirige al registro */}
        <NavLink to="/registro">
          <button className="bg-white text-brand w-30 h-10 rounded-xl border-3 border-brand hover:bg-brand-light cursor-pointer">
            Regístrate
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
