import { Routes, Route } from 'react-router-dom';

import Login from './Pages/loginPage/Login';
import Signup from './Pages/loginPage/signup';
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
import Perfil from './Pages/Perfil'; // Importa tu componente real
import './App.css';
import { useMediaQuery } from 'react-responsive';
import Messages from './Pages/Messages';
import Landing from './Pages/Landing';
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
            