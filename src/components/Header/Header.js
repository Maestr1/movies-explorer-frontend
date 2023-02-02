import './Header.css'
import Navigation from '../Navigation/Navigation';
export default function Header() {

  return (
    <header className="header header_type_landing">
      <div className="container">
        <Navigation/>
      </div>
    </header>
  );
}
