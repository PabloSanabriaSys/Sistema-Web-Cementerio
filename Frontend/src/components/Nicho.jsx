// Nicho.js
import React, { useState } from 'react';
import Modal from './ModalNicho';
import ModalCuadrado from './ModalCuadrado';

const Nicho = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDatos, setModalDatos] = useState(false);


  const abrirModal = (disponible) => {
    if (!disponible) {
      setModalDatos(!modalDatos)
      return;
    }
    setModalVisible(!modalVisible);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const cerrarModalDatos = () => {
    setModalDatos(false);
  };

  const colorClass = item.color === 'rojo' ? 'bg-red-800' : 'bg-slate-800';

  return (
    <div className={`relative border-4 m-2 rounded border-slate-500 h-40  ${colorClass}`}>
      <button className='w-full h-full p-4 text-white' onClick={() => abrirModal(item.color !== 'rojo')}>
        <p>Nicho {item.area}</p>
      </button>

      {modalVisible && <Modal item={item} onClose={cerrarModal} />}
      {modalDatos &&  <ModalCuadrado item={item} closeModal={cerrarModalDatos} />}
    </div>
  );
};

export default Nicho;
