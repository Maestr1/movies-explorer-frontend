import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Layout from '../Layout/Layout';
import Profile from '../Profile/Profile';
import Homepage from '../Homepage/Homepage';
import mainApi from '../../utils/MainApi';
import CurrentUserProvider from '../../hoc/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../../hoc/ProtectedRoute';
import AuthContext from '../../hoc/AuthContext';
import Preloader from '../Preloader/Preloader';
import LoadingContext from '../../hoc/LoadingContext';
import { useResize } from '../../hook/useResize';

function App() {
  const screenWidth = useResize();
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesItems, setMoviesItems] = useState([]);
  const [savedMoviesItems, setSavedMoviesItems] = useState([]);
  const [moviesSearchError, setMoviesSearchError] = useState('');
  const [numberToAdd, setNumberToAdd] = useState(0);
  const [listSize, setListSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  // При загрузке приложения - проверяем авторизацию и чистим хранилище от предыдущих запросов
  useEffect(() => {
    checkAuth();
    localStorage.clear();
  }, []);

  // При изменении размера экрана - определяем количество карточек для вывода
  useEffect(() => {
    setTimeout(determinesNumberOfCards, 500);
  }, [screenWidth.isScreenLg, screenWidth.isScreenMd, screenWidth.isScreenSm]);

  // Определяем количество карточек для вывода и добавления
  function determinesNumberOfCards() {
    if (screenWidth.isScreenLg) {
      setListSize(12);
      setNumberToAdd(3);
    }
    if (screenWidth.isScreenMd) {
      setListSize(8);
      setNumberToAdd(2);
    }
    if (screenWidth.isScreenSm) {
      setListSize(5);
      setNumberToAdd(2);
    }
  }

  // Логика доавления количества карточек по кнопке "Еще"
  function addBtnClickHandler() {
    setListSize(listSize + numberToAdd);
  }

// Проверка авторизации запросом на сервер
  function checkAuth() {
    mainApi.auth()
      .then(userInfo => {
        setLoggedIn(true);
        setCurrentUser(userInfo);
      })
      .catch(() => {
        setLoggedIn(false);
        setMoviesItems([]);
        localStorage.clear();
        console.log('Ошибка аутентификации');
      });
  }

  // Логика авторизации с редиректом на фильмы
  function handleLogin(password, email) {
    mainApi.login({ password, email })
      .then(() => setLoggedIn(true))
      .then(() => navigate('/movies'))
      .catch(err => console.log(`Ошибка авторизации. Код ошибки: ${err}`));
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setMoviesItems([]);
        localStorage.clear();
      })
      .then(() => navigate('./signin'))
      .catch(err => console.log(err));
  }

  // Логика регистрации с редиректом на авторизацию
  function handleRegister(name, password, email) {
    mainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin');
      })
      .catch(err => console.log(`Ошибка регистрации. Код ошибки: ${err}`));
  }

  // фильтрует массив от сервера по запросу и длине
  function filterResult(list, query, isShort) {
    return list.filter((movie) => {
      return (isShort ? movie.duration <= 40 : movie.duration > 40) && (movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()));
    });
  }

  // Функция для горячей фильтрации по переключателю
  function filterByShortSwitch(isShort) {
    const moviesList = JSON.parse(localStorage.getItem('movies'));
    if (moviesList) {
      const result = filterResult(moviesList, localStorage.getItem('query'), isShort);
      setMoviesItems(result);
    }
  }

  async function getMoviesList() {
    if (!localStorage.getItem('movies')) {
      await moviesApi.getMovies()
        .then(res => {
          localStorage.setItem('movies', JSON.stringify(res));
        });
    }
  }

  function searchMovies(query, isShort) {
    setMoviesSearchError('');
    setIsLoading(true);
    getMoviesList()
      .then(() => {
        let searchResult = filterResult(JSON.parse(localStorage.getItem('movies')), query, isShort);
        if (searchResult.length) {
          setMoviesItems(searchResult);
        } else setMoviesSearchError('Ничего не найдено');
      })
      .catch(() => setMoviesSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
        getSavedMoviesList();
    }
  }, [location]);

  function getSavedMoviesList() {
    mainApi.getMovies()
      .then(res => {
        setSavedMoviesItems(res);
      })
      .catch(err => console.log(`Ошибка запроса. Код ошибки: ${err}`));
  }

  function saveMovie(movie) {
    setSavedMoviesItems([])
    mainApi.saveMovie(movie, currentUser._id)
      .then(() => {
        setSavedMoviesItems([...savedMoviesItems, movie])
      })
      .then(() => {
        console.log('saved');
      })
      .catch(err => console.log(`Ошибка сохранения. Код ошибки: ${err}`));
  }

  function deleteMovie(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => setSavedMoviesItems(savedMoviesItems.filter(i => i._id !== movie._id)))
      .then(() => console.log('deleted'))
      .catch(err => console.log(`Ошибка удаления. Код ошибки: ${err}`));
  }


  if (loggedIn === undefined) {
    return <Preloader/>;
  } else return (
    <AuthContext.Provider value={loggedIn}>
      <CurrentUserProvider.Provider value={currentUser}>
        <LoadingContext.Provider value={isLoading}>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Homepage/>}/>
              <Route path="/movies"
                     element={<ProtectedRouteElement element={Movies} listSize={listSize}
                                                     clickHandler={addBtnClickHandler} btnType="save"
                                                     filterByShortSwitch={filterByShortSwitch}
                                                     error={moviesSearchError} saveHandler={saveMovie}
                                                     moviesItems={moviesItems}
                                                     onSubmit={searchMovies}/>}/>
              <Route path="/saved-movies"
                     element={<ProtectedRouteElement element={SavedMovies} moviesItems={savedMoviesItems}
                                                     listSize={listSize} deleteHandler={deleteMovie} btnType="delete"
                                                     filterByShortSwitch={filterByShortSwitch} error={moviesSearchError}
                                                     onSubmit={searchMovies}/>}/>
              <Route path="/profile"
                     element={<ProtectedRouteElement element={Profile} onLogout={handleLogout}/>}/>
            </Route>
            <Route path="signin" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="signup" element={<Register handleRegister={handleRegister}/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </LoadingContext.Provider>
      </CurrentUserProvider.Provider>
    </AuthContext.Provider>
  );
}

export default App;
