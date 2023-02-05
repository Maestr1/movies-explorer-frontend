import React from 'react';
import './Layout.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

function Layout(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn}/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default Layout;
