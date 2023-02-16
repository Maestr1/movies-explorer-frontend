import './Burger.css';

function Burger({ onClick, isMenuOpen }) {

  return (
    <>
      <button onClick={onClick} className={`burger-btn ${isMenuOpen ? 'burger-btn_active' : ''}`}>
        <span className="burger-btn__bar-top"></span>
        <span className="burger-btn__bar-mid"></span>
        <span className="burger-btn__bar-bot"></span>
      </button>
    </>
  );
}

export default Burger;
