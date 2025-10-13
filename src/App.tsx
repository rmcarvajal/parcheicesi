import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import NavBarDsk from './components/NavbarDsk';
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
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
          {/* rutas de tabs del header */}
          <Route path="/" element={dskSize? <FeedPC/> : <Feed/> } />
          <Route path="/messages" element={<div>Página de mensajes</div>} />
          <Route path="/materias" element={<div>Página de materias</div>} />
          <Route path="/perfil" element={<div>Página de perfil</div>} />
        </Routes>
      </main>
      {dskSize? "": navBarMvl}
      
    </div>
    </div>
  );
}

export default App;