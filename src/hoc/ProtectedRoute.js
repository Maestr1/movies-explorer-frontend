import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const loggedIn = useContext(AuthContext)

  return loggedIn
    ? <Component {...props} />
    : <Navigate to="/signin" replace />;
};


export default ProtectedRouteElement;
