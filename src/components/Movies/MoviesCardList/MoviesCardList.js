import React, {useContext, useEffect, useState} from 'react';
import './MoviesCardList.css';
import {moviesApiConfig} from '../../../utils/configs';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadingContext from '../../../hoc/LoadingContext';
import Preloader from '../../Preloader/Preloader';
import {useResize} from '../../../hook/useResize';

function MoviesCardList(props) {

  const screenWidth = useResize();
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [numberToAdd, setNumberToAdd] = useState(0)
  const [listSize, setListSize] = useState(0)
  const isLoading = useContext(LoadingContext);
  const moviesList = props.moviesItems.slice(0, listSize).map((item) => (
    <MoviesCard btnType="save" title={item.nameRU} duration={item.duration}
                cover={`${moviesApiConfig.baseUrl}${item.image.url}`} trailerLink={item.trailerLink}/>
  ));

  useEffect(() => {
    determiningNumberOfCards()
    setListSize(numberOfCards + numberToAdd)
   // setTimeout(determiningNumberOfCards, 3000)
  }, [screenWidth]);

  function determiningNumberOfCards() {
    if (screenWidth.isScreenLg) {
      setNumberOfCards(9);
      setNumberToAdd(3)
    }
    if (screenWidth.isScreenMd) {
      setNumberOfCards(6);
      setNumberToAdd(2)
    }
    if (screenWidth.isScreenSm) {
      setNumberOfCards(3)
      setNumberToAdd(2)
    }
  }

  function clickHandler() {
    setNumberOfCards(numberOfCards + numberToAdd)
  }

  if (isLoading) {
    return <Preloader/>;
  } else return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        {props.error ? <p className="moviesCardList__error">{props.error}</p> : moviesList}
      </ul>
      {props.error ? '' : <button onClick={clickHandler} className="moviesCardList__more-btn btn">Еще</button>}
    </section>
  );
}

export default MoviesCardList;
