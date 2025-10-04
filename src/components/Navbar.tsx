import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar() {
  return (
    <div id='navbar-container' className='px-4 py-5'>
    <nav id="nav-bar" className='flex flex-row w-full justify-around '>
      
      {/* Usamos NavLink y tipamos el argumento de la función 'style' o 'className'. 
        React Router proporciona la interfaz 'NavLinkRenderProps' implícitamente.
      */}
      <NavLink 
        to="/" >
        <svg xmlns="http://www.w3.org/2000/svg" id='feed' className= "w-11.5 h-11.5 fill-brand" viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
        </svg>
      </NavLink>

        <NavLink 
        to="/messages" >
        <svg xmlns="http://www.w3.org/2000/svg" id='messages' className= "w-11.5 h-11.5 fill-brand" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        </svg>
      </NavLink>

      <NavLink 
        to="/materias" >
          <svg xmlns="http://www.w3.org/2000/svg" id='materias' className= "w-11.5 h-11.5 fill-brand" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
          </svg>
      </NavLink>

      <NavLink 
        to="/perfil" >
         <svg xmlns="http://www.w3.org/2000/svg" id='perfil' className= "w-11.5 h-11.5 fill-brand" viewBox="0 0 16 16">
           <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
      </NavLink>
      
    </nav>
    </div>
  );
}

export default NavBar;
