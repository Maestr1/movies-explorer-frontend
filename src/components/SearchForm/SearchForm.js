import React, { useContext, useEffect, useState } from 'react';
import Switch from 'react-switch';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import FormDisableContext from '../../context/FormDisableContext';

function SearchForm(props) {
  const isDisabled = useContext(FormDisableContext);
  const [isShort, setIsShort] = useState(false);
  const [query, setQuery] = useState('');
  const location = useLocation();

  // Повторная фильтрация при переключении свитчера
  useEffect(() => {
    props.filterByShortSwitch(isShort, props.searchKey);
  }, [isShort]);

  // При переходе по указанным роутам - свитчер и запрос загружаются из хранилища
  useEffect(() => {
    if (location.pathname === '/movies' || location.pathname === '/saved-movies') {
      const query = localStorage.getItem(`${props.searchKey}-query`);
      const value = localStorage.getItem(`${props.searchKey}-query-short`) === 'true';
      setTimeout(() => {
        setIsShort(value);
        if (query) {
          setQuery(query);
        }
      }, 500);
    }
  }, [location.pathname]);

  //  Меняем состояние свитчера
  function clickHandler(value) {
    setIsShort(prevCheck => !prevCheck);
    localStorage.setItem(`${props.searchKey}-query-short`, JSON.stringify(value));
  }

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (query) {
      // localStorage.setItem(`${props.searchKey}-query-short`, JSON.stringify(isShort));
      localStorage.setItem(`${props.searchKey}-query`, query);
      props.onSubmit(query, isShort);
    } else console.log('Введите запрос');
  }

  return (
    <section className="searchForm container">
      <form className="searchForm__form">
        <input onChange={handleChangeQuery} disabled={isDisabled} value={query} required placeholder="Фильм"
               className="searchForm__input"
               type="text"/>
        <button onClick={submitHandler} disabled={isDisabled} className="searchForm__btn btn">Найти</button>
      </form>
      <div className="searchForm__switch-wrapper">
        <Switch disabled={isDisabled} aria-label="Переключатель для выбора полнометражных фильмов"
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
