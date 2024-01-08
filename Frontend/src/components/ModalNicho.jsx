// Modal.js
import React from 'react';
import FormNicho from './FormNicho';

const Modal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <FormNicho item={item} onClose={onClose}/>
    </div>
  );
};

export default Modal;
