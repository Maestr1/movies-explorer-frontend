import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <SearchForm searchKey={props.searchKey} filterByShortSwitch={props.filterByShortSwitch} onSubmit={props.onSubmit}/>
      <MoviesCardList btnType={props.btnType} type={'loaded'} deleteHandler={props.deleteHandler} saveHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler} error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default Movies;
