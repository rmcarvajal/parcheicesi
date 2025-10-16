import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

// Tipamos el contacto
interface Chat {
  id: number;
  user: string;
  avatar: string;
  preview: string;
  time: string;
  unread?: boolean;
}

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

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Tipado para evitar 'never'
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => setNewMessage('');

  // Función tipada para seleccionar chat 
  const handleSelectChat = (chat: Chat) => setSelectedChat(chat);

  if (!selectedChat) {
    // Vista inicial: Solo lista de contactos 
    return (
      <div className="messages-list-view">
        <button onClick={() => navigate('/')} className="back-btn">← Volver</button>
        <div className="chat-list">
          {sampleChats.map((chat) => (
            <div key={chat.id} className="chat-item" onClick={() => handleSelectChat(chat)}>
              <img src={chat.avatar} alt={chat.user} className="chat-avatar" />
              <div>
                <h3 className="chat-user">{chat.user}</h3>
                <p className="chat-preview">{chat.preview}</p>
              </div>
              <div className="chat-meta">
                <p className="chat-time">{chat.time}</p>
                {chat.unread && <span className="unread-dot"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista de chat seleccionado 
  return (
    <div className="messages-container">
      <div className="chat-sidebar">
        <button onClick={() => navigate('/')} className="back-btn">← Volver</button>
        <div className="chat-list">
          {sampleChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat.id === chat.id ? 'selected' : ''}`}
              onClick={() => handleSelectChat(chat)}
            >
              <img src={chat.avatar} alt={chat.user} className="chat-avatar" />
              <div>
                <h3 className="chat-user">{chat.user}</h3>
                <p className="chat-preview">{chat.preview}</p>
              </div>
              <div className="chat-meta">
                <p className="chat-time">{chat.time}</p>
                {chat.unread && <span className="unread-dot"></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <h2>{selectedChat.user}</h2>
        </div>
        <div className="messages-scroll">
          {/* Burbujas genéricas para mostrar la idea general */}
          <div className="message-bubble received">
            <p>¡Hola! ¿Qué tal?</p>
            <span>8:36 pm</span>
          </div>
          <div className="message-bubble sent">
            <p>¡Bien, gracias!</p>
            <span>8:37 pm</span>
          </div>
        </div>
        <div className="input-bar">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;