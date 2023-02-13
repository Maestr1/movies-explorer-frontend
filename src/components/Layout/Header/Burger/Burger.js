import './Burger.css';

function Burger({ onClick, isMenuOpen }) {

  return (
    <>
      <button onClick={onClick} className={`burger-btn ${isMenuOpen ? 'burger-btn_active' : ''}`}>
        <span className="burger-btn__bar-top"></span>
        <span className="burger-btn__bar-mid"></span>
        <span className="burger-btn__bar-bot"></span>
      </button>
      <div className={`burger-btn__overlay ${isMenuOpen ? 'burger-btn__overlay_active' : ''}`}/>
    </>
  );
}

export default Burger;
