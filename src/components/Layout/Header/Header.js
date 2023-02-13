import './Header.css';
import Navigation from './Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header(props) {

  const [isLanding, setIsLanding] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLanding(false);
    } else setIsLanding(true);
  }, [location]);

  return (
    <header className={`header ${isLanding ? 'header_type_landing' : ''}`}>
      <div className="container header__wrapper">
        <Navigation isLanding={isLanding}/>
      </div>
    </header>
  );
}

export default Header;
