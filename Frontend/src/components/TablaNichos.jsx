import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TablaNichos() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Realizar la petición GET al servidor
        axios.get('http://127.0.0.1:5000/api/nichos/')
            .then(response => {
                setData(response.data); // Almacena los datos en el estado
            })
            .catch(err => {
                setError(err); // Maneja errores si la petición falla
            });
    }, []); // El segundo argumento [] asegura que useEffect solo se ejecute una vez al montar el componente

    return (
        <section className="container mx-auto p-6 font-mono">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-white text-white text-center">TABLA NICHO</h1>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className='px-4 py-3'>Id</th>
                                <th className="px-4 py-3">Area</th>
                                <th className="px-4 py-3">Sección</th>
                                <th className="px-4 py-3">Tipo Nicho</th>
                                <th className="px-4 py-3">Nombre de defunto</th>
                                <th className="px-4 py-3">Costo </th>
                                <th className="px-4 py-3">Fecha de nacimiento</th>
                                <th className="px-4 py-3">Fecha de Defuncion </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data && data.map(item => (
                                <tr className="text-gray-700">
                                    <td className="px-4 py-3 border">{item.id_nicho}</td>
                                    <td className="px-4 py-3 border">
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-black">{item.area}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-ms font-semibold border">{item.seccion}</td>
                                    <td className="px-4 py-3 text-ms font-semibold border">{item.tipo_nicho}</td>
                                    <td className="px-4 py-3 text-xs border">
                                        <span className="px-2 py-1 font-semibold leading-tight  rounded-sm">{item.difunto.nombre+" " +item.difunto.apellido_paterno +" "+item.difunto.apellido_materno}</span>
                                    </td>
                                    <td className="px-4 py-3 text-ms font-semibold border">{item.costo}</td>
                                    <td className="px-4 py-3 text-sm border">{item.difunto.fecha_nacimiento}</td>
                                    <td className="px-4 py-3 text-sm border">{item.difunto.fecha_fallecimiento}</td>
                                </tr>)

                            )

                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </section>

    )
}
export default TablaNichos;