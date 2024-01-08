
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nicho from '../components/Nicho';

const n = [
  {
    area: "a1",
    color: "rojo",
    valor: 4800,
  },
  {
    area: "a2",
    color: "rojo",
    valor: 4800,
  },
  {
    area: "a3",
    color: "rojo",
    valor: 4800,
  },
  {
    area: "a4",
    color: "rojo",
    valor: 4800,
  },
  {
    area: "b1",
    color: "rojo",
    valor: 5000,
  },
  {
    area: "b2",
    color: "rojo",
    valor: 5000,
  },
  {
    area: "b3",
    color: "rojo",
    valor: 5000,
  },
  {
    area: "b4",
    color: "rojo",
    valor: 5000,
  },
  {
    area: "c1",
    color: "rojo",
    valor: 4500,
  },
  {
    area: "c2",
    color: "rojo",
    valor: 4500,
  },
  {
    area: "c3",
    color: "rojo",
    valor: 4500,
  },
  {
    area: "c4",
    color: "rojo",
    valor: 4500,
  },
];


const SeccionNichos = () => {
  const [dataFromApi, setDataFromApi] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET al servidor
    axios.get('http://127.0.0.1:5000/api/nichos/')
      .then(response => {
        // Actualizar el estado con los datos obtenidos
        
        setDataFromApi(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos desde la API:', error);
      });
  }, []);

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        Seccion B</h1>
      <div className="grid grid-cols-4 gap-6 px-5">
        {n.map((item, index) => {
          // Verificar si el área existe en los datos de la API
          const areaEnDatosApi = dataFromApi.find(dataItem => dataItem.area === item.area && dataItem.seccion === 'Sección B');

          // Determinar el color en función de la existencia del área en los datos de la API
          const color = areaEnDatosApi ? 'rojo' : 'verde';
          const area = item.area  
          const seccion='Sección B'
          const tipo_nicho='Permanente'
          const valor=item.valor
          // Pasa el color al componente Nicho
          return <Nicho key={index} item={{ ...areaEnDatosApi, color,item ,area, seccion, tipo_nicho, valor}} />;
        })}
      </div>
    </>
  );
};

export default SeccionNichos;
