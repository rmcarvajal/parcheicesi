import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const sampleChats = [
  { id: 1, user: 'Chloe', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_8_rywvr6.png', preview: '¡Ey!', time: '2:15 pm', unread: true },
  { id: 2, user: 'José Manuel', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_9_fjcban.png', preview: 'Hola', time: '1:22 pm' },
  { id: 3, user: 'Melissa', avatar: 'https://res.cloudinary.com/di4ckwvxe/image/upload/v1760301652/image_15_h2um1a.png', preview: 'OMG!', time: '6:15 pm', unread: true },
];

const sampleMessages = [
  { id: 1, text: '¿Qué tal hoy?', sender: 'other', time: '8:36 pm' },
  { id: 2, text: 'Bien, ¡gracias!', sender: 'me', time: '8:37 pm' },
];

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat] = useState(sampleChats[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => setNewMessage('');

  return (
    <div className="messages-container">
      {/* Sidebar: Botón volver y chats */}
      <div className="chat-sidebar">
        <button onClick={() => navigate('/')} className="back-btn">← Volver</button>
        <div className="chat-list">
          {sampleChats.map((chat) => (
            <div key={chat.id} className="chat-item">
              <img src={chat.avatar} alt={chat.user} className="chat-avatar" />
              <div>
                <h3 className="chat-user">{chat.user}</h3>
                <p className="chat-preview">{chat.preview}</p>
              </div>
              <p className="chat-time">{chat.time}</p>
              {chat.unread && <span className="unread-dot"></span>}
            </div>
          ))}
        </div>
      </div>

      {/* Ventana de chat */}
      <div className="chat-window">
        <div className="chat-header">
          <h2>{selectedChat.user}</h2>
        </div>
        <div className="messages-scroll">
          {sampleMessages.map((msg) => (
            <div key={msg.id} className={`message-bubble ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          ))}
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