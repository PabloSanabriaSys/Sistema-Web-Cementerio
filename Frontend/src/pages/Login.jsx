import React, { useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import SuccessModal from '../components/SuccessModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();  // Obtiene la función de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username,email, password });

      if (response.status === 200) {
        setShowSuccessModal(true);

        // Utiliza la función navigate para redirigir a la página /cementerio
        login();
        navigate('/cementerio/doliente');
      } else {
        setShowErrorModal(true);
        console.log('Invalid credentials');
      }
    } catch (error) {
      setShowErrorModal(true);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-gradient-to-r from-slate-700 via-gray-950 to-slate-700 text-black">
        <div className="max-w-md text-center">
          <img
            src="/cementerio.jpg"
            className="w-full h-full max-w-md text-center border-2 border-white p-2"
            alt="Nichos de Cochabamba"
            title="Cementerio de Cochabamba"
          />
        </div>
        <div className="max-w-md text-center">
          <img
            src="/cement2.jpeg"
            className="w-full h-full max-w-md text-center border-2 border-white p-2"
            alt="Nichos de Cochabamba"
            title="Cementerio de Cochabamba"
          />
          <img
            src="/cement3.jpeg"
            className="w-full h-full max-w-md text-center border-2 border-white p-2"
            alt="Nichos de Cochabamba"
            title="Cementerio de Cochabamba"
          />
        </div>

      </div>
      <div className="w-full bg-gradient-to-r from-slate-700 via-gray-950 to-slate-700 lg:w-1/2 flex items-center justify-center ">
        <div className=' bg-white bg-opacity-60 rounded-xl'>
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">Inicio de Sesion</h1>
            <h1 className="text-sm font-semibold mb-6 text-black text-center">
              Bienvenido al sistema de registro y asignación de nichos del cementerio general de Cochabamba
            </h1>
            <form action="#" method="POST" className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingrese su usuario"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su email"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-700 shadow-lg text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  Iniciar Sesion
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showErrorModal && <ErrorModal onClose={() => setShowErrorModal(false)} />}
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
}

export default Login;
