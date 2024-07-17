import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import kinopoiskApi from '../../utils/KinopoiskApi';
import React, {useEffect, useState} from 'react';
import Popup from '../Popup/Popup';
import LoginRequestPopup from '../Popup/LoginRequestPopup';

function Movies(props) {

  // const [moviesList, setMoviesList] = useState([]);


  useEffect(() => {
    props.getPopularMovies()
  }, []);


  return (
    <>
      <SearchForm onSubmit={props.findHandler}/>
      <MoviesCardList setLoginRequestPopupIsOpen={props.setLoginRequestPopupIsOpen} btnType={props.btnType} type={'loaded'} deleteHandler={props.deleteHandler}
                      saveHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler}
                      error={props.error} moviesItems={props.moviesItems}/>
      <Popup isOpen={props.loginRequestPopupIsOpen} onClose={props.closeAllPopups}>
        <LoginRequestPopup/>
      </Popup>
    </>
  );
}

export default Movies;
