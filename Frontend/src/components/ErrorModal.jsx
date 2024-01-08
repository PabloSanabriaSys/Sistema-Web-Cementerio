import React from 'react';

function ErrorModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p>Datos incorrectos.</p>
        <button
          onClick={onClose}
          className="mt-2 bg-red-500 text-white p-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
