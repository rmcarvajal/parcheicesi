import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../components/features/authSlice";
import { RootState } from "../../components/app/store";

import person from "../../assets/person-fill.svg";
import lock from "../../assets/lock.svg";
import hidden from "../../assets/hidden.svg";
import shown from "../../assets/shown.svg";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState("password");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );

    if (user) {
      dispatch(login({ email: usernameOrEmail, password }));
      navigate("/feed");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">
      <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-4 py-5 justify-around items-center md:w-125">
        <img src="src/assets/LOGO grande.png" className="w-43 h-30.5" alt="Logo" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col justify-center items-center gap-4"
        >
          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={person} className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Usuario o correo"
              className="pl-3 max-w-45"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
            <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
              <img src={lock} className="w-3.5 h-5" />
            </div>
            <input
              type={showpass}
              placeholder="Contraseña"
              className="pl-3 max-w-45"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showpass === "password" ? hidden : shown}
              className="w-5 h-5 cursor-pointer mr-2"
              onClick={() =>
                setShowpass((textType) =>
                  textType === "text" ? "password" : "text"
                )
              }
            />
          </div>

          <a
            href="#"
            className="underline text-center text-brand mb-5 text-sm"
          >
            ¿Olvidaste tu contraseña?
          </a>

          <button
            type="submit"
            className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-gray-400 text-center">¿No tienes una cuenta?</p>

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
