import { Link } from "react-router-dom";
import SeccionNichos from "./SeccionNichos";

export default function Nichos() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        Secciones
      </h1>
      <div className="grid grid-cols-2 gap-6 px-5">
        <div className={`border-4 m-2  border-slate-300 transition-colors duration-300 transform bg-slate-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 h-96 `}>
          <Link to="/cementerio/temporales" className="text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          <button className='w-full h-full p-4'>
              Seccion Temporales
              </button>
          </Link>
          
        </div>

        <div className={`border-4 m-2  border-slate-300  
        transition-colors duration-300 transform bg-slate-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}>
          <Link to="/cementerio/permanentes" className="text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
              <button className='w-full h-full p-4'>
                Seccion Permanentes
              </button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}