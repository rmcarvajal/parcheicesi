import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Navbar from './components/Navbar';
import NavBarDsk from './components/NavbarDsk';
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
import Messages from './Pages/Messages';
import './App.css';
import { useMediaQuery } from 'react-responsive';

function App() {
  const dskSize = useMediaQuery({minWidth: 768})
  const navBarMvl = <div className=' fixed bottom-0 w-full z-5 bg-white'><Navbar/>  </div>
  return (
    <div id='app' className="app">
      <div className=' min-w-screen'>
      
      <main className="main-content">
        <Routes>
          {/* Rutas existentes*/}
          <Route path="/" element={dskSize? <FeedPC/> : <Feed/> } />
          <Route path="/messages" element={<Messages />} />
          <Route path="/materias" element={<div>Página de Materias</div>} />
          <Route path="/perfil" element={<div>Página de Perfil</div>} />
          {/* ¡Nuevas rutas para login y registro*/}
          <Route path="/login" element={<Login/>} />
          <Route path="/registro" element={<div>Página de Registro</div>} />
        </Routes>
      </main>
      {dskSize? "": navBarMvl}
      
    </div>
    </div>
  );
}

export default App;