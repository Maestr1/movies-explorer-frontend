import '../Movies/Movies.css';
// import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Popup from '../Popup/Popup';
import MoviesPopup from '../Popup/MoviesPopup/MoviesPopup';

function Movies(props) {
  return (
    <>
      <Popup isOpen={props.moviePopupIsOpen} onClose={props.closePopup}>
        <MoviesPopup selectedMovie={props.selectedMovie}/>
      </Popup>
      {/*<SearchForm queryKey={props.queryKey} searchKey={props.searchKey} filterByShortSwitch={props.filterByShortSwitch} onSubmit={props.onSubmit}/>*/}
      <MoviesCardList handlePopupOpen={props.handlePopupOpen} btnType={props.btnType} type={'loaded'} deleteHandler={props.deleteHandler}
                      saveHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler}
                      error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default Movies;
