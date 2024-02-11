import React, {useEffect} from 'react';
import './Popup.css';

function Popup(props) {

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        props.onClose();
      }
    });
  }, []);

  return (<div onClickCapture={e => (e.currentTarget === e.target) && props.onClose()}
               className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      {props.children}
      <button onClick={props.onClose} className="popup__close-btn" aria-label="Закрыть"></button>
    </div>
  </div>);
}

export default Popup;
