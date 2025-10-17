import { NavLink } from 'react-router-dom';


function NavBarDsk() {
  return (
    <div id='navbar-container' className='flex flex-col min-w-20 h-screen fi p-7.5 bg-white sticky top-0 border-r-2 border-white gap-10 items-center'>
        <img src='src\Assets\LOGO horizontal.png' className='h-22 w-auto object-contain mb-8'></img>
        <nav id="nav-bar" className='flex flex-col w-full justify-around '>
      
      {/* Usamos NavLink y tipamos el argumento de la función 'style' o 'className'. 
        React Router proporciona la interfaz 'NavLinkRenderProps' implícitamente.
      */}
      <NavLink 
        to="/" 
        className="text-brand font-bold text-2xl w-fit my-1 hover:pl-1.5 hover:pr-5.5 hover:bg-orange hover:text-white ease-in transition-transform hover:translate-x-2"
        >
        Inicio
      </NavLink>

        <NavLink 
        to="/messages" 
        className="text-brand font-bold text-2xl w-fit my-1 hover:pl-1.5 hover:pr-5.5 hover:bg-yellow hover:text-black ease-in transition-transform hover:translate-x-2"
        >
        Mensajes
      </NavLink>

      <NavLink 
        to="/materias" className="text-brand font-bold text-2xl w-fit my-1 hover:pl-1.5 hover:pr-5.5 hover:bg-purple hover:text-white ease-in transition-transform hover:translate-x-2"
        >
        Materias
      </NavLink>

      <NavLink 
        to="/perfil" className="text-brand font-bold text-2xl w-fit my-1 hover:pl-1.5 hover:pr-5.5 hover:bg-secondary hover:text-white ease-in transition-transform hover:translate-x-2"
        >
        Perfil
      </NavLink>
      
        </nav>
    </div>
  );
}

export default NavBarDsk;