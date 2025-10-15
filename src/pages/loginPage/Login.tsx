import { useState } from "react"
import person from "../../assets/person-fill.svg"
function Login(){
const [showpass, setShowpass] = useState("password")

    return(
        <div className="w-screen h-screen bg-brand flex justify-center items-center">

        <div className="w-[301px] h-[542px] flex flex-col bg-white rounded-3xl p-5 justify-center items-center" >

            <img src="src\assets\LOGO grande.png" className="w-[172px] h-[126px]" />

            <div className="w-[247px] h-[33px] bg-amber-600 flex rounded-l-xl">
                <div className="w-[39px] h-[33px] bg-fuchsia-400 rounded-l-xl flex justify-center items-center">
                    <img src={person} className="w-[20px] h-[20px]" />
                </div>
                <input type="text" placeholder="Usuario." className="pl-[13px]" />
            </div>


            <input type={showpass} placeholder="Contraseña"/>

            <button onClick={() => setShowpass(textType => (textType === "text" ? "password" : "text"))}>Show</button>

            <a href="" className="underline">¿Olvidaste tu contraseña?</a>

            <button className="bg-green-500">Iniciar sesion</button>
        </div>

        </div>
    )
}

export default Login