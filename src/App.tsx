import { Routes, Route } from 'react-router-dom';
import Login from './Pages/loginPage/Login.tsx';
import Signup from './Pages/loginPage/signup.tsx';
import Feed from './Pages/Feed';
import FeedPC from './Pages/Feed-PC';
import Perfil from './Pages/Perfil.tsx'; 
import './App.css';
import { useMediaQuery } from 'react-responsive';
import Messages from './Pages/Messages.tsx';
import Landing from './Pages/Landing.tsx';

function App() {
  const dskSize = useMediaQuery({ minWidth: 768 });


  return (
    <div id="app" className="app">
      <div className="h-screen w-screen bg-white">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing/>} />

            <Route path="login" element={<Login />} />
            <Route path="/registro" element={<Signup />} />

            <Route path="/feed" element={dskSize ? <FeedPC /> : <Feed />} />
            <Route path="/messages" element={<Messages/>} />
            <Route path="/materias" element={<div>Página de Materias</div>} />

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
            