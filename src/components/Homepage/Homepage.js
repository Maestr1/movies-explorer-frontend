import React from 'react';
import './Homepage.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import About from './About/About';

function Homepage(props) {
  return (
    <>
      <Promo/>
      <NavTab/>
      <About/>
    </>
  );
}

export default Homepage;
