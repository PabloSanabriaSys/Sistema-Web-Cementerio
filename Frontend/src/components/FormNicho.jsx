import React, {useEffect, useState}  from 'react';
import ErrorModal from '../components/ErrorModal'; // Asegúrate de que la ubicación sea correcta.
import SuccessModal from '../components/SuccessModal';
import ExitoModal from '../components/ExitoModal';
import OcupadoModal from '../components/OcupadoModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormNicho = ({item, onClose}) => {
    const [text, setText]=useState('');
    const [idDifunto, setIdDifunto] = useState('');
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaDeNaci, setFechaDeNaci] = useState('');
    const [fechaDefuncion, setFechaDefuncion] = useState('');
    const [fechaEntierro, setFechaEntierro]=useState(' ');
    const [fechaLimite, setFechaLimite]=useState(' ');

    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [exitoModalOpen, setExitoModalOpen] = useState(false);
    const [ocupadoModalOpen, setOcupadoModalOpen] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        if(exitoModalOpen) navigate('/cementerio/nichos');
    },[exitoModalOpen])

    const registrarNicho = async (e) => {
        e.preventDefault();

        try {
            // Datos que se enviarán en la solicitud POST
            const datosCremacion = {
                costo: parseFloat(item.valor), // Convertir a número
                area : item.area,
                seccion: item.seccion,
                fecha_limite: fechaLimite,
                fecha_entierro: fechaEntierro,
                tipo_nicho: item.tipo_nicho,
                difunto: id,
              };
            // Realizar la solicitud POST
            const response = await axios.post('http://127.0.0.1:5000/api/nichos/add', datosCremacion);

            if (response.status === 200) {
                setText(response.data.message)
                console.log(response);
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
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/${idDifunto}`);
            console.log(response.data);
            if (Object.keys(response.data).length !== 0) return response.data;
        } catch (error) {
        }

        try {
            
            const response = await axios.get(`http://127.0.0.1:5000/api/difuntos/ci/${idDifunto}`);
            console.log(response.data);
          
            return response.data;
        } catch (error) {
            console.error('Error al obtener información del difunto:', error);
            throw error; 
        }
    };

    const buscarDifunto = async () => {
        try {
            // Supongamos que solo queremos que funcione cuando el idDifunto es igual a 1.
            let data = await obtenerInformacionDifunto();

            if (Object.keys(data).length !== 0) {
                // Realiza la lógica de búsqueda en la base de datos aquí.
                // Debes configurar la lógica para buscar datos según el 'idDifunto'.

                // Supongamos que encontraste datos del difunto en la base de datos.
                const difuntoEncontrado = {
                    id: data.id_difunto,
                    nombre: data.nombre, // Reemplaza esto con los datos reales.
                    apellido: data.apellido_paterno + " " + data.apellido_materno, // Reemplaza esto con los datos reales.
                    fechaDefuncion: data.fecha_fallecimiento, // Reemplaza esto con los datos reales.
                    fechaDeNaci: data.fecha_nacimiento
                };

                if (difuntoEncontrado) {
                    setId(difuntoEncontrado.id)
                    setNombre(difuntoEncontrado.nombre);
                    setApellido(difuntoEncontrado.apellido);
                    setFechaDefuncion(difuntoEncontrado.fechaDefuncion);
                    setFechaDeNaci(difuntoEncontrado.fechaDeNaci);
                    setSuccessModalOpen(true);
                } else {
                    setErrorModalOpen(true);
                }
            } else {
                setErrorModalOpen(true); // Mostrar el modal de error si el idDifunto no es igual a 1.
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
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto overflow-auto h-full">
            <div className="mx-auto max-w-2xl ">


                {/* Card */}
                <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700 ">
                    <button className="absolute top-0 right-0 border-2 rounded-md m-0.5 border-white-400" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ff0000" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(255 0 0)" className="m-1 w-6 h-6" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                    <div className="text-center">
                            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
                                Registro nicho
                            </h2>
                        </div>
                        
                        <form className="space-y-4" onSubmit={(e) => registrarNicho(e)}>

                            <div className="mb-4 sm:mb-4">
                                <label className="font-bold text-white dark:text-gray-200" for="id_difunto"> Buscar difunto</label>
                                <div className="flex">
                                    <input id="id_difunto"
                                    placeholder="ID Difunto o Carnet Difunto"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => setIdDifunto(e.target.value)}
                                    required
                                    >
                                    </input>

                                    <button
                                    type='button'
                                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-teal-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                    onClick={buscarDifunto}
                                    >
                                    Buscar Difunto
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4 sm:mb-4">
                                <label className="font-bold text-white dark:text-gray-200">Nombre Difunto</label>
                                <input
                                    id="nombre_difunto"
                                    placeholder="Nombre Difunto"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    value={nombre}
                                    disabled={true}
                                    required
                                >
                                </input>
                                
                            </div>
                           <div className="mb-4 sm:mb-4">
                                <label className="font-bold text-white dark:text-gray-200"> Apellido Difunto</label>
                                <input
                                    id="apellido_difunto"
                                    placeholder="Apellido difunto"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    value={apellido} // Asigna el valor de 'apellido'
                                    disabled={true}
                                    required
                                />
                            </div>
                            <div className=' grid grid-cols-2 gap-4'>
                                <div>
                                    <label className=" font-bold block text-white mb-2">
                                        Fecha de Nacimiento:
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaDeNaci"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={fechaDeNaci } // Asigna el valor de 'fechaDefuncion'
                                        disabled={true}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className=" font-bold block text-white mb-2">
                                        Fecha de Defunción:
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaDefuncion"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={fechaDefuncion} // Asigna el valor de 'fechaDefuncion'
                                        disabled={true}
                                        required
                                    />
                                    
                                </div>
                            </div>
                           <div className='flex flex-row items-center gap-4'>
                                <div>
                                        <label className=" font-bold block text-white mb-2"> Sección</label>
                                        <input
                                            type="text"
                                            id="seccion"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                            value={item.seccion} // Asigna el valor de 'fechaDefuncion'
                                            disabled={true}
                                            required
                                        />
                                </div>
                                <div>
                                    <label className=" font-bold block text-white mb-2"> Área</label>
                                    <input
                                        type="text"
                                        id="area"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={item.area} // Asigna el valor de 'fechaDefuncion'
                                        disabled={true}
                                        required
                                    />
                                </div>
                           </div>
                           <div className='grid grid-cols-2 gap-4'>
                            
                                <div>
                                    <label className=" font-bold block text-white mb-2"> Tipo de nicho</label>
                                    <input
                                        type="text"
                                        id="tipo_nicho"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={item.tipo_nicho} 
                                        disabled={true}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className=" font-bold block text-white mb-2"> Costo</label>
                                    <input
                                        type="text"
                                        id="valor_nicho"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={item.valor} 
                                        disabled={true}
                                        required
                                    />
                                </div>
                           </div>
                           <div className=' grid grid-cols-2 gap-4'>
                                <div>
                                    <label className=" font-bold block text-white mb-2">
                                        Fecha de Entierro
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaEntierro"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={fechaEntierro } // Asigna el valor de 'fechaDefuncion'
                                        onChange={(e) => setFechaEntierro(e.target.value)}
                                        min={"2023-11-22"}
                                        max={"2024-11-22"}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className=" font-bold block text-white mb-2">
                                        Fecha de Fecha limite
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaLimite"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                        value={fechaLimite} // Asigna el valor de 'fechaDefuncion'
                                        onChange={(e) => setFechaLimite(e.target.value)}
                                        min={"2023-11-22"}
                                        max={"2030-11-22"}
                                        required
                                    />
                                    
                                </div>
                           </div>
                            <div className="mt-2 grid">
                                <button
                                onClick={registrarNicho}
                                className="px-8 py-2.5 leading-5 text-white transition-colors 
                                duration-300 transform bg-teal-700 rounded-md 
                                hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                >
                                Registrar Nicho
                                </button>
                            </div>
                        </form>

                    
                    
                    {errorModalOpen && <ErrorModal onClose={closeModal} />}
                    {successModalOpen && <SuccessModal onClose={closeModal} />}
                    {exitoModalOpen && <ExitoModal onClose={closeModal}/> }
                    {ocupadoModalOpen && <OcupadoModal onClose={closeModal} text={text}/>}
                </div>
                
                {/* End Card */}
            </div>
            
        </div>
    );
};

export default FormNicho;
