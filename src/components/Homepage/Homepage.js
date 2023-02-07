import React from 'react';
import './Homepage.css';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import About from './About/About';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

function Homepage(props) {
  return (
    <>
      <Promo/>
      <NavTab/>
      <About/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </>
  );
}

export default Homepage;
