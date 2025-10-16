import { useState } from "react"
import person from "../../assets/person-fill.svg"
import lock from "../../assets/lock.svg"
import hidden from "../../assets/hidden.svg"
import shown from "../../assets/shown.svg"
function Login(){
const [showpass, setShowpass] = useState("password")

    return(
    <div className="w-screen h-screen bg-brand flex justify-center items-center">

        <div className="w-[301px] h-[542px] flex flex-col bg-white rounded-3xl p-2 justify-center items-center md:w-[449px]" >

            <img src="src\assets\LOGO grande.png" className="w-[172px] h-[126px] mb-[30px]" />

            <div className="w-[247px] h-[33px] bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2 mb-[33px]">
                <div className="w-[39px] h-[33px] bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={person} className="w-[20px] h-[20px]" />
                </div>
                <input type="text" placeholder="Usuario" className="pl-[13px]" />
            </div>

            <div className="w-[247px] h-[33px] bg-gray-100 flex items-center rounded-l-xl border-gray-400 border-y-2 border-r-2 mb-[33px]">
                <div className="w-[39px] h-[33px] bg-brand rounded-l-xl flex justify-center items-center">
                    <img src={lock} className="w-[15px] h-[20px]" />
                </div>
                <input type={showpass} placeholder="Contraseña" className="pl-[13px] max-w-[180px]" />

                
            <img src={showpass ? shown : hidden} className="w-[20px] h-[20px]" onClick={() => setShowpass(textType => (textType === "text" ? "password" : "text"))}/>
            </div>


            <a href="" className="underline text-brand mb-[20px]">¿Olvidaste tu contraseña?</a>

            <button className="bg-brand text-white w-[120px] h-[41px] rounded-xl mb-[35px]">Iniciar sesion</button>

            <p className="text-gray-400 mb-[25px]">¿No tienes una cuenta?</p>

            
            <button className="bg-white text-brand w-[120px] h-[41px] rounded-xl border-3 border-brand">Registrate</button>
        </div>

    </div>
    )
}

export default Login