import React from 'react';
import feedData from '../../components/Feed-components/FeedData.json';

// Definimos la estructura de notificación (del JSON del feed)
interface NotificationItem {
  id: number;
  user: string;
  text: string;
  time: number;
}

function Notification() {
  // Aquí usamos los datos del feed como si fueran notificaciones
  const notifications: NotificationItem[] = feedData;

  return (
    <div id='notification-panel' className='fixed top-0 right-0 h-screen w-full md:w-96 bg-white shadow-xl z-40 p-5'>
      <h2 className='text-3xl font-bold text-dark mb-6 border-b pb-3'>Notificaciones</h2>

      {/* Lista de Notificaciones */}
      <div id='notifications-list' className='flex flex-col gap-4 overflow-y-auto h-[calc(100vh-80px)]'>
        {notifications.map((notif) => (
          <div key={notif.id} className='flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150 cursor-pointer'>
            
            {/* Ícono simple pa la notificación (simulando un "nuevo post") */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 mt-1 fill-brand" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M4 4h8v1H4zm0 2h8v1H4zm0 2h8v1H4zm0 2h7v1H4z"/>
            </svg>
            
            <div>
              <p className='text-sm text-gray-800'>
                <strong className='font-semibold text-brand-dark'>{notif.user}</strong> posted:
                
              </p>
              {/* Usamos un poco del texto del post como contenido de la notificación */}
              <p className='text-xs text-gray-600 mt-1 line-clamp-2'>{notif.text.substring(0, 80)}...</p>
              <span className='text-xs text-gray-400 mt-1 block'>{notif.time} days ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;