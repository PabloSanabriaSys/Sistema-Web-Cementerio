import React, { useState } from 'react';
import axios from 'axios';
import ErrorModal from '../components/ErrorModal'; // Asegúrate de que la ubicación sea correcta.
import SuccessModal from '../components/SuccessModal';
import ExitoModal from '../components/ExitoModal';
import OcupadoModal from '../components/OcupadoModal';


const RegistroDoliente = () => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [exitoModalOpen, setExitoModalOpen] = useState(false);
  const [ocupadoModalOpen, setOcupadoModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carnet: 0,
    numero_celular: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'carnet' || name === 'numero_celular' ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://127.0.0.1:5000/api/dolientes/add', formData); 
      console.log('Respuesta del servidor:', response.data);
      if (response.status === 205) {
        setText(response.data.message)
        console.log(response.data.message);
        setOcupadoModalOpen(true);
        return;
      }
      if (response.status === 201) {
        console.log('Registro de cremación exitoso:', response.data);
        setExitoModalOpen(true);
      } 
      else {
        console.error('Error en el registro de cremación:', response.statusText);
        setErrorModalOpen(true);
        // Puedes manejar errores de otra manera, por ejemplo, mostrando un mensaje de error.
      }
    } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    }
  };
  const closeModal = () => {
    setErrorModalOpen(false);
    setSuccessModalOpen(false);
    setExitoModalOpen(false);
    setOcupadoModalOpen(false);

  };
  return (
    <div className="max-w-4xl p-6 mx-auto  bg-white bg-opacity-90 rounded-md shadow-md dark:bg-gray-800">
      <h2 className="font-bold text-center  text-3xl  text-black capitalize dark:text-white">Registro de doliente</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-950 font-bold dark:text-white">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder='Ingrese el nombre'
            pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$"
            required
          />
        </div>
        <div>
          <label className="block text-gray-950 font-bold dark:text-white">Apellido Paterno</label>
          <input
            type="text"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder='Ingrese el apellido paterno'
            pattern='^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'
            required
          />
        </div>
        <div>
          <label className="block text-gray-950 font-bold dark:text-white">Apellido Materno</label>
          <input
            type="text"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder='Ingrese el apellido materno'
            pattern='^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'
            required
          />
        </div>
        <div>
          <label className="block text-gray-950 font-bold dark:text-white">Número de Carnet</label>
          <input
            type="number"
            name="carnet"
            value={formData.carnet}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder='Ingrese el numero de carnet'
            min={"100000"}
            max={"1000000"}
            required
          />
        </div>
        <div>
          <label className="block text-gray-950 font-bold dark:text-white">Celular</label>
          <input
            type="number"
            name="numero_celular"
            value={formData.numero_celular}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            placeholder='Ingrese el numero de celular'
            min={"60000000"}
            max={"79999999"}
            required
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-teal-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Realizar registro
          </button>
        </div>
      </form>
      {errorModalOpen && <ErrorModal onClose={closeModal} />}
      {successModalOpen && <SuccessModal onClose={closeModal} />}
      {exitoModalOpen && <ExitoModal onClose={closeModal}/> }
      {ocupadoModalOpen && <OcupadoModal onClose={closeModal} text={text}/>}
    </div>
  );
};

export default RegistroDoliente;
