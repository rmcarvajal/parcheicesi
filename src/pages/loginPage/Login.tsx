import { useState } from "react"
import person from "../../assets/person-fill.svg"
import lock from "../../assets/lock.svg"
import hidden from "../../assets/hidden.svg"
import shown from "../../assets/shown.svg"
import { NavLink } from "react-router-dom"
function Login(){
const [showpass, setShowpass] = useState("password")

    return(
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">

        <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-4 py-5 justify-around items-center md:w-125" >

            <img src="src\assets\LOGO grande.png" className="w-43 h-30.5" />

            <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={person} className="w-5 h-5" />
                </div>
                <input type="text" placeholder="Usuario" className="pl-3 max-w-45" />
            </div>

            <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
                <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={lock} className="w-3.5 h-5" />
                </div>
                <input type={showpass} placeholder="Contraseña" className="pl-3 max-w-45" />

                
            <img src={showpass ? shown : hidden} className="w-5 h-5 cursor-pointer" onClick={() => setShowpass(textType => (textType === "text" ? "password" : "text"))}/>
            </div>


            <a href="" className="underline text-center text-brand mb-5">¿Olvidaste tu contraseña?</a>

            <NavLink to="/feed">
                <button className="bg-brand text-white w-30 h-10 rounded-xl   border-3 border-brand  hover:text-brand-light cursor-pointer">Iniciar sesion</button>
            </NavLink>

            <p className="text-gray-400 text-center">¿No tienes una cuenta?</p>

            <NavLink to="/registro">
                <button className="bg-white text-brand w-30 h-10 rounded-xl border-3 border-brand hover:bg-brand-light cursor-pointer">Registrate</button>                
            </NavLink>

        </div>

    </div>
    )
}

export default Login