// Importa React y el hook useState para manejar estados locales
import { useState } from 'react';
// Hook para navegar entre rutas
import { useNavigate } from 'react-router-dom';
// Estilos del componente
import './Messages.css';
// Hook para detectar tamaño de pantalla (responsive)
import { useMediaQuery } from 'react-responsive';
// Navbar inferior para móvil
import NavBar from '../components/Navbar';  

// Interface que define la estructura de un chat en la lista
interface Chat {
  id: number;
  user: string;
  avatar: string;
  preview: string;
  time: string;
  unread?: boolean; // opcional → indica si hay mensajes sin leer
}

// Lista de chats simulados (fake data)
const sampleChats: Chat[] = [
  { id: 1, user: 'Chloe Rodríguez', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_8_rywvr6.png', preview: '¡Ey, qué tal el parche!', time: '2:15 pm', unread: true },
  { id: 2, user: 'José Manuel López', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_9_fjcban.png', preview: 'Hola, ¿notes de mates?', time: '1:22 pm' },
  { id: 3, user: 'Matías Guerra', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760391831/3d2bb963-485d-4ccb-b648-a72e2a3b75f2_ru9lmr.jpg', preview: '¿Vienes al evento?', time: '12:32 pm' },
  { id: 4, user: 'Alberto José Pérez', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760391831/ab467ed9-a212-4028-a3e7-15dca074b49b_y1g080.jpg', preview: 'Interesante la clase', time: '10:34 am', unread: true },
  { id: 5, user: 'Gabriela Silva', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_15_h2um1a.png', preview: '¡Graduación soon!', time: '2:15 pm' },
  { id: 6, user: 'Melissa Vargas', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760391913/c943acb2-9c2a-4cfa-83a0-9363b69172d0_tpdjeo.jpg', preview: 'OMG, viste eso?', time: '6:15 pm', unread: true },
  { id: 7, user: 'Carlos Mendoza', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760391914/41ebe0a7-1d3c-421c-b1fb-3225837be021_v9x7zq.jpg', preview: 'Grupo de estudio?', time: '5:45 pm' },
  { id: 8, user: 'Ana Torres', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760391912/e33ef034-8c1e-47e4-af21-2ac9eface400_hiij5y.jpg', preview: '¡Bienestar hoy!', time: '4:20 pm', unread: true },
];

function Messages() {
  // Detecta si es pantalla de escritorio
  const dskSize = useMediaQuery({ minWidth: 768 });

  // Navbar móvil stick al fondo
  const navBarMvl = (
    <div className="fixed bottom-0 w-full z-50 bg-white">
      <NavBar/>
    </div>
  );

  // Navegación de rutas
  const navigate = useNavigate();

  // Chat seleccionado (id)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  // Mensaje nuevo que se escribe en el input
  const [newMessage, setNewMessage] = useState('');

  // Encuentra el chat seleccionado basado en selectedChatId
  const selectedChat = sampleChats.find(chat => chat.id === selectedChatId);

  // Seleccionar un chat desde la lista
  const handleSelectChat = (chat: Chat) => {
    setSelectedChatId(chat.id);
  };

  // Volver a la lista cuando se está dentro de un chat (modo móvil)
  const handleBackToChats = () => {
    setSelectedChatId(null);
  };

  // Simulación de envío de mensajes
  const handleSend = () => {
    if (newMessage.trim() !== '') {
      // En una app real aquí se enviaría el mensaje al backend
      setNewMessage(''); // Limpia el input
    }
  };

  // --- COMPONENTE: Barra lateral con los chats ---
  const ChatSidebar = () => (
    <div className={`chat-sidebar ${selectedChatId ? 'mobile-hide' : ''}`}>
      
      {/* Botón volver al feed */}
      <button className="back-btn" onClick={() => navigate('/feed')}>
        ← Return to home
      </button>

      {/* Buscador */}
      <div className="search-bar">
        <div className="search-input-wrapper">
          {/* Icono de búsqueda */}
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <input type="text" placeholder="Search contacts..." />
        </div>
      </div>

      {/* Lista de chats */}
      <div className="chat-list">
        {sampleChats.map((chat) => (
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => handleSelectChat(chat)}
          >
            {/* Foto del contacto */}
            <img src={chat.avatar} alt={chat.user} className="chat-avatar" />
            
            {/* Nombre y preview */}
            <div>
              <h3 className="chat-user">{chat.user}</h3>
              <p className="chat-preview">{chat.preview}</p>
            </div>

            {/* Hora y punto de unread */}
            <div className="chat-meta">
              <p className="chat-time">{chat.time}</p>
              {chat.unread && <span className="unread-dot"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- COMPONENTE: Ventana de chat seleccionada ---
  const ChatWindow = () => (
    <div className={`chat-window ${selectedChatId ? 'mobile-show' : ''}`}>
      
      {/* Encabezado del chat */}
      <div className="chat-header">
        <button className="back-to-list-btn" onClick={handleBackToChats}>
           ←
        </button>
        <h2>{selectedChat ? selectedChat.user : 'Select a chat'}</h2>
      </div>

      {/* Mensajes de prueba */}
      <div className="messages-scroll">
        <div className="message-bubble received">
          <p>¡Hola! ¿Qué tal?</p>
          <span>8:36 pm</span>
        </div>

        <div className="message-bubble sent">
          <p>¡Bien, gracias!</p>
          <span>8:37 pm</span>
        </div>
      </div>

      {/* Barra para escribir mensajes */}
      <div className="input-bar">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );

  return (
    <div className="messages-container">
      {/* Lista a la izquierda */}
      <ChatSidebar />

      {/* Ventana principal del chat */}
      {(selectedChat || selectedChatId === null) && <ChatWindow />}

      {/* Navbar móvil */}
      {!dskSize && navBarMvl}
    </div>
  );
}

export default Messages;
