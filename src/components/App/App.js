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
import { LOADED_KEY, SAVED_KEY } from '../../utils/constants';
import { moviesApiConfig } from '../../utils/configs';

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
  const [entryError, setEntryError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  // При загрузке приложения - проверяем авторизацию и загружаем сохраненные фильмы, если залогинены
  useEffect(() => {
    checkAuth();
    if (loggedIn) {
      getSavedMoviesList();
      localStorage.removeItem('saved-query')
    }
  }, [loggedIn]);

  // При изменении размера экрана - определяем количество карточек для вывода
  useEffect(() => {
    setTimeout(determinesNumberOfCards, 500);
  }, [screenWidth.isScreenLg, screenWidth.isScreenMd, screenWidth.isScreenSm]);

  // Очищаем ошибку входа при переходах между страницами
  useEffect(() => {
    setEntryError('');
  }, [location]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Проверка авторизации запросом на сервер
  function checkAuth() {
    if (localStorage.getItem('login') === 'true') {
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
    } else {
      console.log('Требуется авторизация');
      setLoggedIn(false);
    }
  }

  // Логика авторизации с редиректом на фильмы
  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('login', 'true');
      })
      .then(() => navigate('/movies'))
      .catch(err => {
        if (err.validation) {
          setEntryError(err.validation.body.message);
        } else setEntryError(err.message);
      });
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
    mainApi.register(name, email, password)
      .then(() => {
        navigate('/signin');
      })
      .catch(err => {
        if (err.validation) {
          setEntryError(err.validation.body.message);
        } else setEntryError(err.message);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // фильтрует массив от сервера по запросу и длине
  function filterResult(list, query, isShort, key = LOADED_KEY) {
    // TODO вынести логику обновления статуса лайков
    if (key === LOADED_KEY) {
      list.forEach(movie => {
        const savedMovieList = JSON.parse(localStorage.getItem(SAVED_KEY));
        if (savedMovieList.find((item) => {
          return item.movieId === movie.movieId;
        })) {
          movie.saved = true;
        }
      });
    }
    if (query) {
      return list.filter((movie) => {
        return (isShort ? movie.duration <= 40 : movie.duration > 40) && (movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()));
      });
    } else {
      return list.filter((movie) => {
        return (isShort ? movie.duration <= 40 : movie.duration > 40);
      });
    }
  }

  // Функция для горячей фильтрации по переключателю, срабатывает при загрузке и показывает карточки
  function filterByShortSwitch(isShort, key) {
    const moviesList = JSON.parse(localStorage.getItem(key));
    if (moviesList) {
      if (key === LOADED_KEY) {
        const result = filterResult(moviesList, localStorage.getItem(`${LOADED_KEY}-query`), isShort, key);
        if (result) {
          setMoviesItems(result);
        }
      }
      if (key === SAVED_KEY) {
        const result = filterResult(moviesList, localStorage.getItem(`${SAVED_KEY}-query`), isShort, key);
        if (result) {
          setSavedMoviesItems(result);
        }
      }
    }
  }

  async function getMoviesList() {
    if (!localStorage.getItem(LOADED_KEY)) {
      await moviesApi.getMovies()
        .then(res => {
          res = res.map((movie) => {
            movie.movieId = movie.id;
            movie.thumbnail = `${moviesApiConfig.baseUrl}${movie.image.formats.thumbnail.url}`;
            movie.image = `${moviesApiConfig.baseUrl}${movie.image.url}`;
            delete movie.id;
            return movie;
          });
          return res;
        })
        .then(res => {
          localStorage.setItem(LOADED_KEY, JSON.stringify(res));
        });
    }
  }

  function getSavedMoviesList() {
    setIsLoading(true);
    mainApi.getMovies()
      .then(res => {
        setSavedMoviesItems(res.reverse());
        localStorage.setItem(SAVED_KEY, JSON.stringify(res));
      })
      .catch(err => console.log(`Ошибка запроса. Код ошибки: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function searchMovies(query, isShort, key, handler) {
    const searchResult = filterResult(JSON.parse(localStorage.getItem(key)), query, isShort);
    if (searchResult.length) {
      handler(searchResult);
    } else setMoviesSearchError('Ничего не найдено');
  }

  function searchSavedMovies(query, isShort) {
    setMoviesSearchError('');
    searchMovies(query, isShort, SAVED_KEY, setSavedMoviesItems);
  }

  function searchLoadedMovies(query, isShort) {
    setMoviesSearchError('');
    setIsLoading(true);
    getMoviesList()
      .then(() => {
        searchMovies(query, isShort, LOADED_KEY, setMoviesItems);
      })
      .catch(() => setMoviesSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => setIsLoading(false));
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function saveMovie(movie) {
    setSavedMoviesItems([]);
    mainApi.saveMovie(movie, currentUser._id)
      .then((res) => {
        movie.saved = true;
        movie._id = res._id;
        const savedMoviesList = JSON.parse(localStorage.getItem(SAVED_KEY));
        savedMoviesList.unshift(res);
        localStorage.setItem(SAVED_KEY, JSON.stringify(savedMoviesList));
        setSavedMoviesItems([res, ...savedMoviesItems ]);
      })
      .catch(err => console.log(`Ошибка сохранения. Код ошибки: ${err}`));
  }

  function defineId(movie) {
    if (!movie._id) {
      movie._id = savedMoviesItems.find(item => item.movieId === movie.movieId)._id;
    }
  }

  function deleteMovie(movie) {
    defineId(movie);
    mainApi.deleteMovie(movie._id)
      .then(() => setSavedMoviesItems(savedMoviesItems.filter(i => i._id !== movie._id)))
      .then(() => {
        const savedMoviesList = JSON.parse(localStorage.getItem(SAVED_KEY)).filter((item) => item.movieId !== movie.movieId);
        localStorage.setItem(SAVED_KEY, JSON.stringify(savedMoviesList));
      })
      .then(() => {
        moviesItems.forEach((item, index) => {
          if (item.movieId === movie.movieId) {
            moviesItems[index].saved = false;
          }
        });
      })
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
                     element={<ProtectedRouteElement element={Movies} searchKey={LOADED_KEY}
                                                     listSize={listSize}
                                                     clickHandler={addBtnClickHandler} btnType="save"
                                                     filterByShortSwitch={filterByShortSwitch}
                                                     error={moviesSearchError} saveHandler={saveMovie}
                                                     deleteHandler={deleteMovie}
                                                     moviesItems={moviesItems}
                                                     onSubmit={searchLoadedMovies}/>}/>
              <Route path="/saved-movies"
                     element={<ProtectedRouteElement element={SavedMovies} searchKey={SAVED_KEY}
                                                     moviesItems={savedMoviesItems} clickHandler={addBtnClickHandler}
                                                     listSize={listSize} deleteHandler={deleteMovie} btnType="delete"
                                                     filterByShortSwitch={filterByShortSwitch} error={moviesSearchError}
                                                     onSubmit={searchSavedMovies}/>}/>
              <Route path="/profile"
                     element={<ProtectedRouteElement element={Profile} onLogout={handleLogout}/>}/>
            </Route>
            <Route path="signin" element={<Login handleLogin={handleLogin} error={entryError}/>}/>
            <Route path="signup" element={<Register handleRegister={handleRegister} error={entryError}/>}/>
            <Route path="*" element={<ErrorPage/>}/>
          </Routes>
        </LoadingContext.Provider>
      </CurrentUserProvider.Provider>
    </AuthContext.Provider>
  );
}

export default App;
