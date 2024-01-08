import React, { useState } from 'react';
import ErrorModal from '../components/ErrorModal'; // Asegúrate de que la ubicación sea correcta.
import SuccessModal from '../components/SuccessModal';
import ExitoModal from '../components/ExitoModal';
import axios from 'axios';
import OcupadoModal from '../components/OcupadoModal';

export default function RegistroCremacion() {
    const [text, setText] = useState('');

    const [idCiDifunto, setIdCiDifunto] = useState('');
    const [idDifunto, setIdDifunto] = useState('');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaDefuncion, setFechaDefuncion] = useState('');
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [exitoModalOpen, setExitoModalOpen] = useState(false);
    const [ocupadoModalOpen, setOcupadoModalOpen] = useState(false);

    const [costo, setCosto] = useState('');
    const [fechaCremacion, setFechaCremacion] = useState('');

    const registrarCremacion = async (e) => {
        e.preventDefault();

        try {
            // Datos que se enviarán en la solicitud POST
            const datosCremacion = {
                costo: parseFloat(costo), // Convertir a número
                fecha_cremacion: fechaCremacion,
                difunto: idDifunto,
              };
            console.log(datosCremacion)
            // Realizar la solicitud POST
            const response = await axios.post('http://127.0.0.1:5000/api/cremaciones/add', datosCremacion);
            if (response.status === 200) {
                setText(response.data.message)
                console.log(response.data.message);
                setOcupadoModalOpen(true);
                return;
            }
            // Verificar la respuesta y realizar acciones según sea necesario
            if (response.status === 201) {
                console.log('Registro de cremación exitoso:', response.data);
                setExitoModalOpen(true);
            } else {
                console.error('Error en el registro de cremación:', response.statusText);
                setErrorModalOpen(true);
                // Puedes manejar errores de otra manera, por ejemplo, mostrando un mensaje de error.
            }
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            // Puedes manejar errores de otra manera, por ejemplo, mostrando un mensaje de error.
        }
    };

    const obtenerInformacionDifunto = async () => {
        try {
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/${idCiDifunto}`);
            console.log(response.data);
            if (Object.keys(response.data).length !== 0) return response.data;
        } catch (error) {
        }

        try {
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/ci/${idCiDifunto}`);
            console.log(response.data);
          
            return response.data;
        } catch (error) {
            console.error('Error al obtener información del difunto:', error);
            throw error; 
        }
    };

    const buscarDifunto = async () => {
        try {
           
            let data = await obtenerInformacionDifunto();

            if (Object.keys(data).length !== 0) {

                const difuntoEncontrado = {
                    id: data.id_difunto,
                    nombre: data.nombre, // Reemplaza esto con los datos reales.
                    apellido: data.apellido_paterno + " " + data.apellido_materno, // Reemplaza esto con los datos reales.
                    fechaDefuncion: data.fecha_fallecimiento, // Reemplaza esto con los datos reales.
                };

                if (difuntoEncontrado) {
                    setIdDifunto(difuntoEncontrado.id)
                    setNombre(difuntoEncontrado.nombre);
                    setApellido(difuntoEncontrado.apellido);
                    setFechaDefuncion(difuntoEncontrado.fechaDefuncion);
                    setSuccessModalOpen(true);
                } else {
                    setErrorModalOpen(true);
                }
            } else {
                setErrorModalOpen(true); // Mostrar el modal de error si el idCiDifunto no es igual a 1.
            }
        } catch (error) {
            // Manejar errores aquí según sea necesario
            console.error('Error al buscar difunto:', error);
            setErrorModalOpen(true);
        }
    };



    const closeModal = () => {
        setErrorModalOpen(false);
        setSuccessModalOpen(false);
        setExitoModalOpen(false);
        setOcupadoModalOpen(false);

    };

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto  bg-white bg-opacity-90 rounded-md shadow-md dark:bg-gray-800">
                <h2 className="font-bold text-center  text-3xl  text-black capitalize dark:text-white">Servicio de cremacion</h2>
                <div className="mb-4">
                    <label className="font-bold text-white dark:text-gray-200" for="id_difunto">Buscar Difunto</label>
                    <div className="flex">
                        <input
                            id="id_difunto"
                            placeholder="ID Difunto o Carnet del Difunto"
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"

                            onChange={(e) => setIdCiDifunto(e.target.value)}
                            required
                        />
                        <button
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-teal-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={buscarDifunto}
                        >
                            Buscar Difunto
                        </button>
                    </div>
                </div>
                <form >
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="font-bold text-white dark:text-gray-200">Nombre Difunto</label>
                            <input
                                id="nombre_difunto"
                                placeholder="Nombre Difunto"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                value={nombre} // Asigna el valor de 'nombre'
                                onChange={(e) => setNombre(e.target.value)} // Actualiza 'nombre' al cambiar el valor
                                disabled={true}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-bold text-white dark:text-gray-200"> Apellido Difunto</label>
                            <input
                                id="apellido_difunto"
                                placeholder="Apellido difunto"
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                value={apellido} // Asigna el valor de 'apellido'
                                onChange={(e) => setApellido(e.target.value)} // Actualiza 'apellido' al cambiar el valor
                                disabled={true}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className=" font-bold block text-white mb-2">
                                Fecha de Defunción:
                            </label>
                            <input
                                type="date"
                                id="fechaDefuncion"
                                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                                value={fechaDefuncion} // Asigna el valor de 'fechaDefuncion'
                                onChange={(e) => setFechaDefuncion(e.target.value)} // Actualiza 'fechaDefuncion' al cambiar el valor
                                disabled={true}
                                required
                            />
                        </div>
                    </div>
                </form>
                <form action="#" method="POST" className="space-y-4" onSubmit={(e) => registrarCremacion(e)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div className="mb-4">
                            <label className="font-bold block text-white mb-2">Fecha de Cremacion:</label>
                            <input
                                type="date"
                                id="fechaDefuncion"
                                value={fechaCremacion}
                                onChange={(e) => setFechaCremacion(e.target.value)}
                                className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                                min={"2023-11-22"}
                                max={"2024-11-22"}
                                required
                            />
                        </div>
                        <div>
                            <label className="font-bold text-white dark:text-gray-200" htmlFor="costo">
                                Costo
                            </label>
                            <input
                                id="costo"
                                placeholder="costo"
                                type="number"
                                value={costo}
                                onChange={(e) => setCosto(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                        type="submit"
                        className="px-8 py-2.5 leading-5 text-white transition-colors 
                        duration-300 transform bg-teal-700 rounded-md 
                        hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Registrar Cremación
                        </button>
                    </div>
                </form>
            </section>
            {errorModalOpen && <ErrorModal onClose={closeModal} />}
            {successModalOpen && <SuccessModal onClose={closeModal} />}
            {exitoModalOpen && <ExitoModal onClose={closeModal}/> }
            {ocupadoModalOpen && <OcupadoModal onClose={closeModal} text={text}/>}
        </div>

    )
}


