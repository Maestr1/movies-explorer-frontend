import React from 'react';
import './Layout.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function Layout(props) {

  let location = useLocation();

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      {location.pathname !== '/profile' ? <Footer/> : ''}
    </>
  );
}

export default Layout;
