import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/navegation/Header';
import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  return (
    <div className="app">
      <Header title="" />
      <main className="main-content">
        <Routes>
          {/* rutas de tabs del header */}
          <Route path="/events" element={<div>Página de Eventos</div>} />
          <Route path="/campus" element={<div>Página de Campus</div>} />
          <Route path="/noticias" element={<div>Página de Noticias</div>} />
          <Route path="/donar" element={<div>Página de Donar</div>} />
        </Routes>
      </main>
      <Navbar /> 
    </div>
  );
}

export default App;