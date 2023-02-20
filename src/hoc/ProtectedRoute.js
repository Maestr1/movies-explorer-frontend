import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import mainApi from '../utils/MainApi';
import Preloader from '../components/Preloader/Preloader';

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  // const [authorized, setAuthorized] = useState(undefined);
  const loggedIn = useContext(AuthContext)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   const authorize = async () => {
  //     try {
  //       await mainApi.auth();
  //       setAuthorized(true);
  //     } catch (err) {
  //       setAuthorized(false);
  //     }
  //   };
  //   authorize()
  //   mainApi.auth()
  //     .then(() => {
  //       setAuthorized(true);
  //       console.log('ok')
  //     })
  //     .catch(() => {
  //       setAuthorized(false);
  //       console.log('err')
  //     })
  // }, [navigate]);

  // if (loggedIn === undefined) {
  //   return <Preloader/>;
  // }

  return loggedIn
    ? <Component {...props} />
    : <Navigate to="/signin" replace />;
  // return (
  //   authorized ? <Component {...props} /> : <Navigate to="/signin" replace/>
  // );
};


export default ProtectedRouteElement;
