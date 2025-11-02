import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom" 
import { useDispatch } from 'react-redux'; 
import { registerUser } from '../../redux/actions/authActions'; 
import email from "../../assets/email.svg"
import lock from "../../assets/lock.svg"
import hidden from "../../assets/hidden.svg"
import shown from "../../assets/shown.svg"


function Signup(){
    // formulario tipados con TypeScript
    const [username, setUsername] = useState<string>('');
    const [emailInput, setEmailInput] = useState<string>(''); 
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Estados para mostrar/ocultar contraseña 
    const [showpass1, setShowpass1] = useState<string>("password");
    const [showpass2, setShowpass2] = useState<string>("password");
    
    // Hooks de Redux y Router
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!username || !emailInput || !password || !confirmPassword) {
            setError('Por favor, rellena todos los campos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        // Creación del objeto JSON
        const userData = {
            username,
            email: emailInput,
            password,
        };

        // registro a Redux/JSON
        dispatch(registerUser(userData));

        // Navega al feed 
        navigate('/feed'); 
    };

    return(
        // 🔑 Aplicamos la clase CSS para el overlay en móvil
        <div className="w-screen h-screen bg-brand flex justify-center items-center p-4 login-fullscreen-overlay">

          <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-2 py-5 justify-around items-center md:w-125" >

            <img src="src/assets/LOGO grande.png" className="w-43 h-30.5" />
            
            {/* 🔑 Mostrar errores de validación/Redux */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* 🔑 Envolvemos los campos en un <form> para manejar el submit */}
            <form onSubmit={handleRegister} className="w-full flex flex-col justify-center items-center gap-4">

                {/* Campo de Nombre de Usuario */}
                <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                    <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                        <img src={email} className="w-5 h-5" />
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
                
                {/* Campo de Correo (Antes estaba como Usuario) */}
                <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                    <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                        <img src={email} className="w-5 h-5" />
                    </div>
                    <input 
                        type="email" 
                        placeholder="Correo Icesi" 
                        className="pl-3 max-w-45"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                    />
                </div>


                {/* Campo de Contraseña */}
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
                        onClick={() => setShowpass1(textType => (textType === "text" ? "password" : "text"))}
                    />
                </div>

                {/* Campo de Confirmar Contraseña */}
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