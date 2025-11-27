import { Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/signup';
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
import Perfil from './Pages/Perfil';
import './App.css';
import { useMediaQuery } from 'react-responsive';
import Messages from './Pages/Messages';
import Landing from './Pages/Landing';
import { useEffect } from 'react';
import { useAppDispatch } from './components/app/hooks';
import { loadSession } from './components/features/authSlice';

function App() {
  // Detecta si el usuario está en pantalla de escritorio (>=768px)
  const dskSize = useMediaQuery({ minWidth: 768 });

  // Hook personalizado de Redux para despachar acciones
  const dispatch = useAppDispatch();

  // Al cargar la app, intenta restaurar la sesión guardada (si existe)
  useEffect(() => {
    dispatch(loadSession());
  }, []);

  return (
    <div id="app" className="app">
      <div className="h-screen w-screen bg-white">
        <main className="main-content">
          <Routes>
            {/* Página inicial tipo landing */}
            <Route path="/" element={<Landing />} />

            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Signup />} />

            {/* Feed: versión móvil o de escritorio según el tamaño de pantalla */}
            <Route path="/feed" element={dskSize ? <FeedPC /> : <Feed />} />

            {/* Página de mensajes */}
            <Route path="/messages" element={<Messages />} />

            {/* Placeholder de Materias */}
            <Route path="/materias" element={<div>Página de Materias</div>} />

            {/* Perfil del usuario */}
            <Route path="/perfil" element={<Perfil />} />

            {/* Fallback para rutas inexistentes */}
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
