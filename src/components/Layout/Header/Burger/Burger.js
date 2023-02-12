import React, { useState } from 'react';
import './Burger.css'

function Burger(props) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  function toggleMenuOpen() {
    if (isBurgerOpen) {
      setIsBurgerOpen(false);
    } else {
      setIsBurgerOpen(true);
    }
  }

  return (
    <button onClick={toggleMenuOpen} className={`nav__burger-btn burger-btn ${isBurgerOpen ? 'burger-btn_active' : ''}`}>
      <span className="burger-btn__bar-top"></span>
      <span className="burger-btn__bar-mid"></span>
      <span className="burger-btn__bar-bot"></span>
    </button>
  );
}

export default Burger;
