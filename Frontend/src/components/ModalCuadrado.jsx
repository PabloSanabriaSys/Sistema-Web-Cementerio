import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModalCuadrado = ({ item, closeModal }) => {
  const [showFallecido, setShowFallecido] = useState(true);

  const navigate = useNavigate();


  const difunto = {
    nombre: 'Nombre del difunto',
    carnet: '123ABC',
    apellido: 'Apellido del difunto',
    fechaNacimiento: '01/01/1970',
    fechaFallecimiento: '02/02/2022',
  };

  const nicho = {
    fechaLimite: '01/01/2040',
    area: 'Área del nicho',
    seccion: 'Sección del nicho',
    tipo: 'Tipo de nicho',
  };
  const eliminarNicho = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/nichos/delete/${item.id_nicho}`);

      if (response.status === 200) {
        console.log('Información de nicho eliminada exitosamente');
        navigate('/cementerio/nichos');
        // Aquí podrías mostrar un mensaje de éxito o realizar otras acciones.
      } else {
        console.error('Error al eliminar la información de nicho:', response.statusText);
        // Manejar errores de otra manera, por ejemplo, mostrar un mensaje de error.
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
      // Manejar errores de otra manera, por ejemplo, mostrar un mensaje de error.
    }
  };

  const showFallecidoData = () => {
    setShowFallecido(true);
  };

  const showNichoData = () => {
    setShowFallecido(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-14 rounded-lg relative text-white">
          <button className="absolute top-0 right-0 border-2 rounded-md m-0.5 border-slate-400" onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(55 65 81)" className="m-1 w-6 h-6" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className='flex justify-center flex-col'>
            <div className="flex justify-between items-center mb-4">
              <div onClick={showFallecidoData} className="absolute left-0 cursor-pointer w-1/2 px-5 py-2 text-sm tracking-wide bg-transparent text-white transition-colors duration-200 bg-teal-600 bg-opacity-10 rounded-lg shrink-0 sm:w-auto hover:bg-teal-600  dark:hover:bg-teal-600  ">&lt;</div>


              {showFallecido && (
                <div className="" >
                  <div className="text-center mb-8">
                    <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                      Datos del difunto
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold">Nombre:</div>
                    <div className="text-393d42 text-right">{item.difunto.nombre}</div>

                    <div className="font-bold">Carnet:</div>
                    <div className="text-393d42 text-right">{item.difunto.carnet}</div>

                    <div className="font-bold">Apellido:</div>
                    <div className="text-393d42 text-right">{item.difunto.apellido_paterno + " " + item.difunto.apellido_materno}</div>

                    <div className="font-bold">Fecha de nacimiento:</div>
                    <div className="text-393d42 text-right">{item.difunto.fecha_nacimiento}</div>

                    <div className="font-bold">Fecha de fallecimiento:</div>
                    <div className="text-393d42 text-right">{item.difunto.fecha_fallecimiento}</div>
                  </div>
                </div>
              )}
              {!showFallecido && (
                <div className="bg-333333">
                  <div className="text-center mb-8">
                    <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                      Datos del Nicho
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold">Fecha límite:</div>
                    <div className="text-393d42 text-right">{item.fecha_limite}</div>

                    <div className="font-bold">Área:</div>
                    <div className="text-393d42 text-right">{item.area}</div>

                    <div className="font-bold">Sección:</div>
                    <div className="text-393d42 text-right">{item.seccion}</div>

                    <div className="font-bold">Tipo de nicho:</div>
                    <div className="text-393d42 text-right">{item.tipo_nicho}</div>
                  </div>
                </div>
              )}

              <div
                onClick={showNichoData}
                className="absolute cursor-pointer right-0 w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-teal-600 rounded-lg shrink-0 sm:w-auto hover:bg-teal-600 dark:hover:bg-teal-600 bg-transparent"
              >&gt;</div>

            </div>
            <button
              onClick={eliminarNicho}
              className="  px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-teal-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Eliminar Difunto del Nicho
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ModalCuadrado;