import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom" 
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../../components/features/authSlice';
import emailIcon from "../../assets/email.svg" 
import lock from "../../assets/lock.svg"
import hidden from "../../assets/hidden.svg"
import shown from "../../assets/shown.svg"


function Signup(){
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [showpass1, setShowpass1] = useState<string>("password");
    const [showpass2, setShowpass2] = useState<string>("password");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
  e.preventDefault(); 
  setError('');

  // Validaciones básicas
  if (!username || !email || !password || !confirmPassword) {
    setError('Por favor, rellena todos los campos.');
    return;
  }

  if (password !== confirmPassword) {
    setError('Las contraseñas no coinciden.');
    return;
  }

  // Datos del usuario
  const userData = {
    username,
    email,
    password,
  };

  // 🔹 Comprobar si el usuario ya existe antes de despachar
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const exists = existingUsers.find(
    (u: any) => u.email === email || u.username === username
  );

  if (exists) {
    setError('⚠️ Este correo o nombre de usuario ya está registrado.');
    return; // 🚫 Detiene el registro
  }

  // 🔹 Registrar usuario
  dispatch(registerUser(userData));

  // ✅ Solo si no hubo errores, navegar al feed
  navigate('/feed'); 
};

    return(
        <div className="w-screen h-screen bg-brand flex justify-center items-center p-4 login-fullscreen-overlay">

          <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-2 py-5 justify-around items-center md:w-125" >

            <img src="src/assets/LOGO grande.png" className="w-43 h-30.5" alt="Logo Parche Icesi" />
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleRegister} className="w-full flex flex-col justify-center items-center gap-4">

                <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                    <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                        <img src={emailIcon} className="w-5 h-5" alt="Username icon" />
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
                        <img src={emailIcon} className="w-5 h-5" alt="Email icon" />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Correo Icesi" 
                        className="pl-3 max-w-45"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                    <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                        <img src={lock} className="w-3.5 h-5" alt="Lock icon" />
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
                        alt="Toggle password visibility"
                        onClick={() => setShowpass1(textType => (textType === "text" ? "password" : "text"))}
                    />
                </div>

                <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                    <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                        <img src={lock} className="w-3.5 h-5" alt="Lock icon" />
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
                        alt="Toggle password visibility"
                        onClick={() => setShowpass2(textType => (textType === "text" ? "password" : "text"))}
                    />
                </div>

                <button 
                    type="submit" 
                    className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer mt-4"
                >
                    Registrate
                </button>
            </form>

            <NavLink to="/login" className="underline text-sm text-gray-600">¿Ya tienes cuenta? Inicia sesión</NavLink>
          </div>

        </div>
    );
}

export default Signup;