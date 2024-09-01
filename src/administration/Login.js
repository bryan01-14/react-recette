import React from 'react';

export default function Login({ authenticate }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-lg mb-4'>Connecte-toi pour créer ou modifier des recettes</h2>
      <button 
        onClick={authenticate} 
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Se connecter avec Facebook
      </button>
    </div>
  );
}
