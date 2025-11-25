import { Routes, Route } from 'react-router-dom';

import Login from './pages/login.tsx';
import Signup from './pages/signup.tsx';
import Feed from './pages/Feed.tsx';
import FeedPC from './pages/Feed-PC.tsx';
import Perfil from './pages/Perfil.tsx'; // Importa tu componente real
import './App.css';
import { useMediaQuery } from 'react-responsive';
import Messages from './pages/Messages.tsx';
import Landing from './pages/Landing.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from './components/app/hooks.ts';
import { loadSession } from './components/features/authSlice.ts';


function App() {
  const dskSize = useMediaQuery({ minWidth: 768 });
  const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(loadSession());
}, []);


  return (
    <div id="app" className="app">
      <div className="h-screen w-screen bg-white">
        <main className="main-content">
          <Routes>
            {/*Landing */}
            <Route path="/" element={<Landing/>} />

            {/* Login y registro */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Signup />} />

            {/* Otras secciones */}
            <Route path="/feed" element={dskSize ? <FeedPC /> : <Feed />} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/materias" element={<div>Página de Materias</div>} />

            {/* Perfil real */}
            <Route path="/perfil" element={<Perfil />} />

            {/* Ruta fallback */}
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </main>

        
      </div>
    </div>
  );
}

export default App;
            