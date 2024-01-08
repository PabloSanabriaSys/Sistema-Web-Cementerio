import React, { useState } from 'react';
import axios from 'axios';
/*import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
}*/

function RegistroDifunto() {
  const [ciDifunto, setCiDifunto] = useState('');
  const [ciEncargado, setCiEncargado] = useState('');
  const [difuntoData, setDifuntoData] = useState(null);
  //modal para el difunto
  const [showModal, setShowModal] = useState(false);
  const [modalError, setModalError] = useState(false);
  //modal para encargado
  const [showEncargadoModal, setshowEncargadoModal] = useState(false);
  const [encargadoError, setEncargadoError] = useState(false);
  const [encargadoRegistrado, setEncargadoRegistrado] = useState(false);
  
  const obtenerInformacionDifunto = async () => {
        try {
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/notario/${ciDifunto}`);
            console.log(response.data);
            if (Object.keys(response.data).length !== 0) return response.data;
        } catch (error) {
        }

        try {
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/notario/ci/${ciDifunto}`);
            console.log(response.data);
          
            return response.data;
        } catch (error) {
            console.error('Error al obtener información del difunto:', error);
            throw error; 
        }
    };
  const handleBuscar = async() => {
    // Simulamos la búsqueda con datos estáticos en este ejemplo
    const difuntoEncontrado = await obtenerInformacionDifunto();

    if (Object.keys(difuntoEncontrado).length !== 0) {
      setDifuntoData(difuntoEncontrado);
    } else {
      setModalError(true);
      setShowModal(true);  
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalError(false);
  };
  const handleModalClick = (e) => {
    e.stopPropagation(); // clics dentro del modal
  };

  const handleBackgroundClick = () => {
    // Evita acciones si el modal está activo
    if (showModal) {
      // clic fuera del modal
    }
  };
  const handleCiDifuntoChange = (e) => {
    if (showModal) {
      handleCloseModal(); // Cerrar el modal si se está mostrando
    }
    if (e.target.value !== ciDifunto) {
      setCiDifunto(e.target.value); // Actualizar el número del difunto
      setDifuntoData(null); // Limpiar los datos del difunto al introducir un nuevo número
    }
  };
    //  logica del modal para el encargado

  const handleRegistrar = () => {
    if (ciEncargado === '12') {
      setEncargadoRegistrado(true);
      setEncargadoError(false);
      setCiDifunto('');
      
    } else {
      setshowEncargadoModal(true);
      setEncargadoError(true);
    }
  };
  const registrarDifunto = async (e) => {
    e.preventDefault();

    try {
        // Datos que se enviarán en la solicitud POST
        const datosCremacion = {
          nombre:difuntoData.nombre,
          apellido_paterno:difuntoData.apellido_paterno,
          apellido_materno:difuntoData.apellido_materno,
          carnet: difuntoData.carnet,
          fecha_nacimiento: difuntoData.fecha_nacimiento,
          fecha_fallecimiento: difuntoData.fecha_fallecimiento,
          doliente: parseInt(ciEncargado)
          };
        console.log(datosCremacion)
        // Realizar la solicitud POST
        const response = await axios.post('http://127.0.0.1:5000/api/difuntos/add', datosCremacion);
        if (response.status === 201) {
          setshowEncargadoModal(true);
          setEncargadoError(false);
          setCiDifunto('');
            return;
        
        } else {
            console.error('Error en el registro de cremación:', response.statusText);
            setshowEncargadoModal(true);
      setEncargadoError(true);
        }
    } catch (error) {
      setshowEncargadoModal(true);
      setEncargadoError(true);
        console.error('Error en la solicitud POST:', error);
    }
};
  
  return (
    <div className="max-w-4xl p-6 mx-auto  bg-white bg-opacity-90 rounded-md shadow-md dark:bg-gray-800 flex flex-col items-center justify-center dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Registro de Difunto</h2>

      <div className="mb-4 ">
        <label className="mr-5">CI del Difunto:</label>
        <input
          type="number"
          value={ciDifunto}
          onChange={handleCiDifuntoChange}
          className=" rounded mr-5 select-box text-black"
          placeholder='Ingrese el CI del difunto'
        />
        <button onClick={handleBuscar} className="p-2 bg-teal-700 text-white px-8 py-2.5 leading-5transition-colors duration-300 transform rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Buscar
        </button>
      </div>

      {difuntoData && (
        <div className=" container ">
          <h3 className="text-center text-lg font-bold mb-2">Datos del Difunto:</h3>
          <div >
            <p className="text-015d52 font-semibold">Nombre:</p>
            <p className="text-right ">{difuntoData.nombre}</p>
            <p className="text-015d52 font-semibold">Apellido:</p>
            <p className="text-right"> {difuntoData.apellido_paterno + " "+ difuntoData.apellido_materno}</p>
            <p className="text-015d52 font-semibold">Fecha Nacimiento:</p>
            <p className="text-right"> {difuntoData.fecha_nacimiento}</p>
            <p className="text-015d52 font-semibold">Fecha Fallecimiento:</p>
            <p className="text-right"> {difuntoData.fecha_fallecimiento}</p>
          </div>
          

          <div className="mt-4 flex justify-between items-center">
            <div className="text-015d52 font-semibold">
              <label className="mr-5">CI. DEL DOLIENTE ENCARGADO :</label>
              <input
                type="number"
                value={ciEncargado}
                onChange={(e) => setCiEncargado(e.target.value)}
                className=" border border-gray-300 rounded mr-5 encargado-ci text-black"
                placeholder='Ingrese el CI del doliente'
                min={"100000"}
                max={"1000000"}
                required
              />
            </div>
            <button onClick={registrarDifunto} 
              className="p-2 bg-teal-700 text-whitepx-8 py-2.5 leading-5 text-white transition-colors duration-300 transform rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Registrar doliente encargado
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal-container " onClick={handleBackgroundClick}>
          <div className="modal" onClick={handleModalClick}>
            <p>El fallecido no existe o no se encuentra en la base de datos del Notario.</p>
            
          </div>
        </div>
        
      )}
      {showEncargadoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
        justify-center z-50  " onClick={handleBackgroundClick}>
          <div className=" bg-slate-700 border-slate-500 border rounded-md p-2" onClick={handleModalClick}>
            {encargadoError ? (
              <div className="mt-4 mr-5 flex justify-between items-center">
                <div className="text-015d52 font-semibold">
                <span className=" cursor-pointer" onClick={handleCloseModal}>&times;</span>

                  <p>Primero registre al doliente encargado.</p>
                  <a href='/doliente'>
                  <button className="p-2 bg-blue-500 text-white mt-4" onClick={() => setshowEncargadoModal(false)}>
                    Ir a Registro de Doliente
                  </button>
                  </a>
                </div>
              </div>
            ) : (
              
                <div className="container ">
                  <span className=" cursor-pointer" onClick={handleCloseModal}>&times;</span>

                <h6></h6>
                <h3 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">REGISTRO EXITOSO</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">ESCOGA QUE TIPO DE SERVICIO QUIERE</p>
                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <a href='/doliente'>  
                  <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-teal-700 rounded-lg shrink-0 sm:w-auto hover:bg-teal-700 dark:hover:bg-teal-700 dark:bg-blue-600">
                    Nicho
                  </button>
                </a>
                  <a href='/doliente'>
                  <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-teal-700 rounded-lg shrink-0 sm:w-auto hover:bg-teal-700 dark:hover:bg-teal-700 dark:bg-blue-600">
                    Cremacion
                  </button>
                  </a>
                </div>
                        
              </div>
            )}
            
            </div>
          </div>
        )}
      </div>
      
    );
  }
  export default RegistroDifunto;