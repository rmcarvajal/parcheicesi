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
    <div className="w-screen h-screen bg-brand flex justify-center items-center">

        <div className="w-[301px] h-[582px] flex flex-col bg-white rounded-3xl p-2 justify-center items-center md:w-[449px]" >

            <img src="src\assets\LOGO grande.png" className="w-[172px] h-[126px] mb-[30px]" />

            <div className="w-[247px] h-[33px] bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2 mb-[33px]">
                <div className="w-[39px] h-[33px] bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={email} className="w-[20px] h-[20px]" />
                </div>
                <input type="text" placeholder="Correo" className="pl-[13px] max-w-[180px]" />
            </div>

            <div className="w-[247px] h-[33px] bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2 mb-[33px]">
                <div className="w-[39px] h-[33px] bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={lock} className="w-[15px] h-[20px]" />
                </div>
                <input type={showpass1} placeholder="Contraseña" className="pl-[13px] max-w-[180px]" />

                
            <img src={showpass1 ? shown : hidden} className="w-[20px] h-[20px]" onClick={() => setShowpass1(textType => (textType === "text" ? "password" : "text"))}/>
            </div>


            <div className="w-[247px] h-[33px] bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2 mb-[33px]">
                <div className="w-[39px] h-[33px] bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={lock} className="w-[15px] h-[20px]" />
                </div>
                <input type={showpass2} placeholder="Contraseña" className="pl-[13px] max-w-[180px]" />

                
            <img src={showpass2 ? shown : hidden} className="w-[20px] h-[20px]" onClick={() => setShowpass2(textType => (textType === "text" ? "password" : "text"))}/>
            </div>
            <NavLink to="/feed">
                <button className="bg-brand text-white w-[120px] h-[41px] rounded-xl mb-[35px]">Registrate</button>                
            </NavLink>


            <p className="text-gray-400 mb-[25px]">¿No tienes una cuenta?</p>

            <NavLink to="/">
                <button className="bg-white text-brand w-[120px] h-[41px] rounded-xl border-3 border-brand">Iniciar sesion</button>                
            </NavLink>

        </div>

    </div>
    )
}

export default Signup