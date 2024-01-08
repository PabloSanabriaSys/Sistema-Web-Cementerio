import React from 'react';

function ExitoModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-green-500 text-5xl mb-4">
          <i className="fas fa-check-circle"></i> {'✔️'}
        </div>
        <p>Datos correctos. El registro ha sido exitoso.</p>
        <button
          onClick={onClose}
          className="mt-2 bg-green-500 text-white p-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ExitoModal;
