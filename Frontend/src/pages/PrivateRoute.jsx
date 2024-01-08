// PrivateRoute.js

import React from 'react';
import {  Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();
    console.log("Es autentificado:",isAuthenticated)
    if(!isAuthenticated) return <Navigate to="/" replace/>

    return <Outlet></Outlet>
};

export default PrivateRoute;
