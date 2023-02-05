import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  return (
    <header className="header header_type_landing">
      <div className="container">
        <Navigation/>
      </div>
    </header>
  );
}

export default Header;
