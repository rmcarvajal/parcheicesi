import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/navegation/Header';
import Navbar from './components/Navbar'; 
import Feed from './Pages/Feed';
import './App.css';

function App() {
  return (
    <div className="app">
      
      <main className="main-content">
        <Routes>
          {/* rutas de tabs del header */}
          <Route path="/" element={<Feed/>} />
          <Route path="/messages" element={<div>Página de Campus</div>} />
          <Route path="/materias" element={<div>Página de Noticias</div>} />
          <Route path="/perfil" element={<div>Página de Donar</div>} />
        </Routes>
      </main>
      <div className=' fixed bottom-0 w-full z-5 bg-white'>
        <Navbar/>  
      </div>
      
    </div>
  );
}

export default App;