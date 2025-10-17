import { useState } from "react"
import email from "../../assets/email.svg"
import lock from "../../assets/lock.svg"
import hidden from "../../assets/hidden.svg"
import shown from "../../assets/shown.svg"
import { NavLink } from "react-router-dom"
function Signup(){
const [showpass1, setShowpass1] = useState("password")
const [showpass2, setShowpass2] = useState("password")

    return(
    <div className="w-screen h-screen bg-brand flex justify-center items-center p-4">

      <div className="max-w-80 max-h-130 w-full h-full flex flex-col bg-white rounded-3xl p-2 py-5 justify-around items-center md:w-125" >

        <img src="src\\assets\\LOGO grande.png" className="w-43 h-30.5" />

        <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
          <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
            <img src={email} className="w-5 h-5" />
          </div>
          <input type="text" placeholder="Correo" className="pl-3 max-w-45" />
        </div>

        <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
          <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
            <img src={lock} className="w-3.5 h-5" />
          </div>
          <input type={showpass1} placeholder="Contraseña" className="pl-3 max-w-45" />
          <img src={showpass1 ? shown : hidden} className="w-5 h-5 cursor-pointer mr-2" onClick={() => setShowpass1(textType => (textType === "text" ? "password" : "text"))}/>
        </div>

        <div className="w-full max-w-62 h-8 bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2">
          <div className="w-9.5 h-8 bg-brand rounded-l-xl flex justify-center items-center">
            <img src={lock} className="w-3.5 h-5" />
          </div>
          <input type={showpass2} placeholder="Confirmar contraseña" className="pl-3 max-w-45" />
          <img src={showpass2 ? shown : hidden} className="w-5 h-5 cursor-pointer mr-2" onClick={() => setShowpass2(textType => (textType === "text" ? "password" : "text"))}/>
        </div>

        <NavLink to="/feed">
          <button className="bg-brand text-white w-30 h-10 rounded-xl border-3 border-brand hover:text-brand-light cursor-pointer">Registrate</button>
        </NavLink>

        <p className="text-gray-400 text-center ">¿Ya tienes una cuenta?</p>

        <NavLink to="/login">
          <button className="bg-white text-brand w-30 h-10 rounded-xl border-3 border-brand hover:bg-brand-light cursor-pointer">Iniciar sesion</button>
        </NavLink>

      </div>

    </div>
    )
}

export default Signup