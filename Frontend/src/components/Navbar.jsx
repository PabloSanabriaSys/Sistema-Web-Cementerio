import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 mb-10 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <Link className="flex-none" to="doliente">
              <img className="w-10 h-auto" src="/vite.svg" alt="Logo"/>
            </Link>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
              >
                <svg
                  className={`hs-collapse-open:${isMenuOpen ? 'hidden' : 'block'} flex-shrink-0 w-4 h-4`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <line x1="3" x2="21" y1="12" y2="12"/>
                  <line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
                </button>
            </div>
          </div>
          <div id="navbar-image-2" className={`hs-collapse ${isMenuOpen ? 'flex items-center justify-center' : 'hidden'} overflow-hidden transition-all duration-300 basis-full grow sm:block`}>
            <div className="flex flex-col gap-16 mt-5 sm:flex-row sm:items-center sm:justify-center sm:mt-0 ">
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="doliente" aria-current="page">Registro Doliente</Link>
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="difunto">Registro Difunto</Link>
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="nichos">Gestion Nichos</Link>
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="cremaciones">Gestion Cremaciones</Link>
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="reportes">Reportes</Link>
              <Link className="font-medium text-gray-600 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" to="/" onClick={logout}>Salir</Link>

            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
