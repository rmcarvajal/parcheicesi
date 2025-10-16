import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/loginPage/Login.tsx';
import Signup from './Pages/loginPage/signup.tsx';
import Navbar from './components/Navbar';
// import NavBarDsk from './components/NavbarDsk'; // opcional
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
import Perfil from './Pages/Perfil.tsx'; // Importa tu componente real
import './App.css';
import { useMediaQuery } from 'react-responsive';

function App() {
  const dskSize = useMediaQuery({ minWidth: 768 });

  const navBarMvl = (
    <div className="fixed bottom-0 w-full z-5 bg-white">
      <Navbar />
    </div>
  );

  return (
    <div id="app" className="app">
      <div className="min-w-screen">
        <main className="main-content">
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={dskSize ? <FeedPC /> : <Feed />} />

            {/* Login y registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Signup />} />

            {/* Otras secciones */}
            <Route path="/feed" element={dskSize ? <FeedPC /> : <Feed />} />
            <Route path="/messages" element={<div>Página de Campus</div>} />
            <Route path="/materias" element={<div>Página de Noticias</div>} />

            {/* Perfil real */}
            <Route path="/perfil" element={<Perfil />} />

            {/* Ruta fallback */}
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </main>

        {/* Navbar móvil */}
        {!dskSize && navBarMvl}
      </div>
    </div>
  );
}

export default App;
            