import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../components/features/authSlice";
import { RootState } from "../../components/app/store";

import emailIcon from "../../assets/email.svg";
import lock from "../../assets/lock.svg";
import hidden from "../../assets/hidden.svg";
import shown from "../../assets/shown.svg";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showpass1, setShowpass1] = useState("password");
  const [showpass2, setShowpass2] = useState("password");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const result = await dispatch(signup({ email, password, username }));

    if (signup.fulfilled.match(result)) {
      navigate("/feed");
    }
  };

  return (
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">

      <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-2 py-5 justify-around items-center md:w-125">

        <img src="src/assets/LOGO grande.png" className="w-43 h-30.5" alt="Logo" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="w-full flex flex-col justify-center items-center gap-4">

          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={emailIcon} className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="pl-3 max-w-45"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={emailIcon} className="w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="Correo ICESI"
              className="pl-3 max-w-45"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>
            <input
              type={showpass1}
              placeholder="Contraseña"
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

          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>
            <input
              type={showpass2}
              placeholder="Confirmar contraseña"
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

          <button
            type="submit"
            className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer mt-4"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Regístrate"}
          </button>
        </form>

        <NavLink to="/login" className="underline text-sm text-gray-600">
          ¿Ya tienes cuenta? Inicia sesión
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
