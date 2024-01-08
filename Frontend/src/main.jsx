import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nichos from './pages/Nichos.jsx';
import SeccionNichos from './pages/SeccionNichos.jsx';
import RegistroDoliente from './pages/RegistroDoliente.jsx';
import RegistroDifunto from './pages/RegistroDifunto.jsx';
import SeccionNichosPermanente from './pages/SeccionNichosPermanente.jsx';
import RegistroCremacion from './pages/RegistroCremacion.jsx';
import Login from './pages/Login.jsx';
import Reportes from './pages/Reportes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: "cementerio",
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        children: [

          {
            path: "nichos",
            element: <Nichos />,
          },
          {
            path: "temporales",
            element: <SeccionNichos />,
          },
          {
            path: "permanentes",
            element: <SeccionNichosPermanente />,
          },
          {
            path: "nichos/:nichoId",
            element: <Nichos />,
          },
          {
            path: "doliente",
            element: <RegistroDoliente />,
          },
          {
            path: "difunto",
            element: <RegistroDifunto />,
          },
          {
            path: "cremaciones",
            element: <RegistroCremacion />,
          },
          {
            path:"reportes",
            element:<Reportes/>,
          }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <Login />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>,
)
