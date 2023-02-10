import React, { useState } from 'react';
import Switch from 'react-switch';
import './SearchForm.css';

function SearchForm(props) {

  const [short, setShort] = useState(false);

  function clickHandler() {
    setShort(prevCheck => !prevCheck);
  }

  return (
    <section className="searchForm container">
      <form className="searchForm__form">
        <input className="searchForm__input" type="text"/>
        <button className="searchForm__btn btn">Найти</button>
      </form>
      <div className="searchForm__switch-wrapper">
        <Switch aria-label="Переключатель для выбора полнометражных фильмов"
                onChange={clickHandler} checked={short} width={36} height={20} handleDiameter={16}
                onHandleColor="#2BE080"
                offHandleColor="#A0A0A0"
                HandleColor="#2BE080" activeBoxShadow="none" uncheckedIcon={false} checkedIcon={false}
                onColor="#343434" offColor="#343434"/>
        <label className="searchForm__switch-label">Короткометражки</label>
      </div>
      {/*<div onClick={clickHandler} className={`searchForm__switch ${short ? 'searchForm__switch_active' : undefined}`}></div>*/}
    </section>
  );
}

export default SearchForm;
