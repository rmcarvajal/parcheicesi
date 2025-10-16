import React from 'react';

function Setting() {
  return (
    <div id='setting-panel' className='fixed top-0 right-0 h-screen w-full md:w-96 bg-white shadow-xl z-40 p-5'>
      <h2 className='text-3xl font-bold text-dark mb-6 border-b pb-3'>Configuración</h2>

      {/* Opciones de Configuración */}
      <div id='settings-options' className='flex flex-col gap-4'>
        
        {/* Opción de Perfil */}
        <div className='p-3 border-b'>
          <h3 className='text-lg font-semibold text-gray-800'>Mi Perfil</h3>
          <p className='text-sm text-gray-500'>Edita tu información, foto y contraseña.</p>
        </div>

        {/* Opción de Modo Oscuro */}
        <div className='p-3 border-b flex justify-between items-center'>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>Apariencia</h3>
            <p className='text-sm text-gray-500'>Cambia el tema de la aplicación (Modo claro/oscuro).</p>
          </div>
          {/* Un simple interruptor */}
          <div className='w-12 h-6 bg-gray-300 rounded-full flex items-center p-1 cursor-pointer'>
            <div className='w-4 h-4 bg-white rounded-full shadow-md'></div>
          </div>
        </div>

        {/* Opción de Cerrar Sesión */}
        <button className='mt-8 p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150'>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Setting;