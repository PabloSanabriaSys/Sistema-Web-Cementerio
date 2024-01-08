import React from 'react';

function OcupadoModal({ onClose , text}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg text-center">
        <div className=" text-red-600 text-5xl mb-4">
          <i className="fas fa-check-circle"></i> {'❌'}
        </div>
        <p>{text}</p>
        <button
          onClick={onClose}
          className="mt-2 bg-red-600 text-white p-2 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default OcupadoModal;
