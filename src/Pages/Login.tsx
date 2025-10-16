import { useState } from "react"
import { NavLink } from "react-router-dom"
function Login(){
const [showpass, setShowpass] = useState("password")

    return(
        <div className="w-screen h-screen bg-brand flex justify-center items-center">

        <div className="w-[301px] h-[542px] flex flex-col bg-white rounded-3xl p-5 justify-center items-center" >

            <div className="w-[172px] h-[126px] bg-amber-300">IMAGE</div>
            <div>
                <input type="text" placeholder="Usuario." />
            </div>


            <input type={showpass} placeholder="Contraseña"/>

            <button onClick={() => setShowpass(textType => (textType === "text" ? "password" : "text"))}>Show</button>

            <a href="" className="underline">¿Olvidaste tu contraseña?</a>
            <NavLink to="/registro" className="underline">¿No tienes cuenta? Registrate</NavLink>
            <NavLink to="/feed">
                <button className="bg-green-500">Iniciar sesion</button>
            </NavLink>
        </div>

        </div>
    )
}

export default Login