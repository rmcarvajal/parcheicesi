import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, signup } from "../components/features/authSlice";
import { RootState } from "../components/app/store";

import emailIcon from "../assets/email.svg";
import lock from "../assets/lock.svg";
import hidden from "../assets/hidden.svg";
import shown from "../assets/shown.svg";
import Logo from "../assets/LOGO grande.png";

function Signup() {
  // Estados locales para almacenar los datos del usuario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para controlar si se muestra o no la contraseña
  const [showpass1, setShowpass1] = useState("password");
  const [showpass2, setShowpass2] = useState("password");

  // Inicializa tools de Redux
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  // Obtiene del estado global si hay error o si está en "loading"
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Manejo del registro del usuario
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación local: verificar que las contraseñas coinciden
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Ejecutar acción de registro en Redux (asíncrono)
    const result = await dispatch(signup({ email, password, username }));

    // Si el registro fue exitoso, redirigir al feed
    if (signup.fulfilled.match(result)) {
      navigate("/feed");
    }
  };

  return (
    // Contenedor principal (pantalla completa, fondo color brand)
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">

      {/* Tarjeta del formulario */}
      <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-2 py-5 justify-around items-center md:w-125">

        {/* Logo superior */}
        <img src={Logo} className="w-43 h-30.5" alt="Logo" />

        {/* Mostrar error si existe */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Formulario de registro */}
        <form onSubmit={handleRegister} className="w-full flex flex-col justify-center items-center gap-4">

          {/* Input de nombre de usuario */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={emailIcon} className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="pl-3 max-w-45"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Input de correo */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={emailIcon} className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="School e-mail"
              className="pl-3 max-w-45"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input de contraseña */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>
            <input
              type={showpass1}
              placeholder="Password"
              className="pl-3 max-w-45"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showpass1 === "password" ? hidden : shown}
              className="w-5 h-5 cursor-pointer mr-2"
              onClick={() =>
                setShowpass1((v) => (v === "password" ? "text" : "password"))
              }
            />
          </div>

          {/* Input confirmar contraseña */}
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>
            <input
              type={showpass2}
              placeholder="Confirm password"
              className="pl-3 max-w-45"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <img
              src={showpass2 === "password" ? hidden : shown}
              className="w-5 h-5 cursor-pointer mr-2"
              onClick={() =>
                setShowpass2((v) => (v === "password" ? "text" : "password"))
              }
            />
          </div>

          {/* Botón de registro */}
          <button
            type="submit"
            className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer mt-4"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Link para ir al login */}
        <NavLink to="/login" className="underline text-sm text-gray-600">
          Already have an account? log in
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
