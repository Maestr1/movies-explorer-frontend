import './Header.css';
import Navigation from './Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../hoc/AuthContext';

function Header(props) {

  const loggedIn = useContext(AuthContext)
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
        <Navigation loggedIn={loggedIn}/>
      </div>
    </header>
  );
}

export default Header;
