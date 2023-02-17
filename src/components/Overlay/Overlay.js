import React from 'react';
import './Overlay.css'

function Overlay(props) {
  return (
    <div className={`overlay ${props.isMenuOpen ? 'overlay_active' : ''}`}/>
  );
}

export default Overlay;
