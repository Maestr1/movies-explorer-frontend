import React, { useState } from 'react';
import Switch from 'react-switch';
import './SearchForm.css';

function SearchForm(props) {

  const [isShort, setIsShort] = useState(false);
  const [query, setQuery] = useState('')

  function clickHandler() {
    setIsShort(prevCheck => !prevCheck);
  }

  function handleChangeQuery(e) {
    setQuery(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault()
    props.onSubmit(query, isShort)
  }

  return (
    <section className="searchForm container">
      <form className="searchForm__form">
        <input onChange={handleChangeQuery} value={query} required placeholder="Фильм" className="searchForm__input" type="text"/>
        <button onClick={submitHandler} className="searchForm__btn btn">Найти</button>
      </form>
      <div className="searchForm__switch-wrapper">
        <Switch aria-label="Переключатель для выбора полнометражных фильмов"
                onChange={clickHandler} checked={isShort} width={36} height={20} handleDiameter={16}
                onHandleColor="#3DDC84" offHandleColor="#A0A0A0" activeBoxShadow="none"
                uncheckedIcon={false} checkedIcon={false}
                onColor="#343434" offColor="#343434"/> <label
        className="searchForm__switch-label">Короткометражки</label>
      </div>
    </section>
  );
}

export default SearchForm;
