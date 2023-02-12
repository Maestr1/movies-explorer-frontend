import './Header.css';
import Navigation from './Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header(props) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLanding(false);
    } else setIsLanding(true);
  }, [location]);

  function toggleMenuOpen() {
    if (isBurgerOpen) {
      setIsBurgerOpen(false);
    } else {
      setIsBurgerOpen(true);
    }
  }

  return (
    <header className={`header ${isLanding ? 'header_type_landing' : undefined}`}>
      <div className="container header__wrapper">
        <Navigation clickHandler={toggleMenuOpen} isMenuOpen={isBurgerOpen} isLanding={isLanding}/>
      </div>
    </header>
  );
}

export default Header;
