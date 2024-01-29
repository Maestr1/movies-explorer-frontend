import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import {useResize} from '../../hook/useResize';
import ProtectedRouteElement from '../../hoc/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Layout from '../Layout/Layout';
import Profile from '../Profile/Profile';
// import Homepage from '../Homepage/Homepage';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import {moviesApiConfig} from '../../utils/configs';
import CurrentUserContext from '../../context/CurrentUserContext';
import AuthContext from '../../context/AuthContext';
import LoadingContext from '../../context/LoadingContext';
import FormDisableContext from '../../context/FormDisableContext';
import {
  LOADED_KEY, NUMBER_CARDS_SCREEN_LG, NUMBER_CARDS_SCREEN_MD,
  NUMBER_CARDS_SCREEN_SM, QUANTITY_TO_ADDED_SCREEN_LG, QUANTITY_TO_ADDED_SCREEN_MD,
  QUANTITY_TO_ADDED_SCREEN_SM, SAVED_KEY, SHORT_FILM_DURATION, SUCCESS_PATCH_MESSAGE
} from '../../utils/constants';
import kinopoiskApi from '../../utils/KinopoiskApi';
import Main from '../Main/Main';

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
  const [entryMessage, setEntryMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  // При загрузке приложения - проверяем авторизацию и загружаем сохраненные фильмы, если залогинены
  useEffect(() => {
    checkAuth();
    getPopularMovies();
    if (loggedIn) {
      getSavedMoviesList();
    }
  }, [loggedIn]);

  // При изменении размера экрана - определяем количество карточек для вывода
  useEffect(() => {
    setTimeout(determinesNumberOfCards, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth.isScreenLg, screenWidth.isScreenMd, screenWidth.isScreenSm]);

  // Очищаем ошибку входа при переходах между страницами
  useEffect(() => {
    setEntryMessage('');
  }, [location]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function getPopularMovies() {
    kinopoiskApi.getPopularMovies()
      .then(data => {
        if (data && data.films) {
          setPopularMovies(data.films);
        }
      })
      .catch(err => console.error(err));
  }

  // Определяем количество карточек для вывода и добавления
  function determinesNumberOfCards() {
    if (screenWidth.isScreenLg) {
      setListSize(NUMBER_CARDS_SCREEN_LG);
      setNumberToAdd(QUANTITY_TO_ADDED_SCREEN_LG);
    }
    if (screenWidth.isScreenMd) {
      setListSize(NUMBER_CARDS_SCREEN_MD);
      setNumberToAdd(QUANTITY_TO_ADDED_SCREEN_MD);
    }
    if (screenWidth.isScreenSm) {
      setListSize(NUMBER_CARDS_SCREEN_SM);
      setNumberToAdd(QUANTITY_TO_ADDED_SCREEN_SM);
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
  function handleLogin(values) {
    setIsDisabled(true);
    mainApi.login(values)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem('login', 'true');
      })
      .then(() => navigate('/', { replace: true }))
      .catch(err => {
        if (err.validation) {
          setEntryMessage(err.validation.body.message);
        } else setEntryMessage(err.message);
      })
      .finally(() => setIsDisabled(false));
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setMoviesItems([]);
        localStorage.clear();
      })
      .then(() => navigate('/', { replace: true }))
      .catch(err => console.log(err));
  }

  // Логика регистрации с последующей авторизацией при успехе
  function handleRegister(values) {
    setIsDisabled(true);
    mainApi.register(values)
      .then(() => handleLogin(values))
      .catch(err => {
        if (err.validation) {
          setEntryMessage(err.validation.body.message);
        } else setEntryMessage(err.message);
      })
      .finally(() => setIsDisabled(false));
  }

  function handleChangeProfile(name, email) {
    setIsDisabled(true);
    mainApi.changeProfile(name, email)
      .then(res => {
        setEntryMessage(SUCCESS_PATCH_MESSAGE);
        setTimeout(() => setEntryMessage(''), 4000);
        setCurrentUser(res);
      })
      .catch(err => {
        if (err.validation) {
          setEntryMessage(err.validation.body.message);
        } else setEntryMessage(err.message);
      })
      .finally(() => setIsDisabled(false)
      );
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
        return (isShort ? movie.duration <= SHORT_FILM_DURATION : movie.duration > SHORT_FILM_DURATION) && (movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()));
      });
    } else {
      return list.filter((movie) => {
        return (isShort ? movie.duration <= SHORT_FILM_DURATION : movie.duration > SHORT_FILM_DURATION);
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
    setIsDisabled(true);
    setIsLoading(true);
    setMoviesSearchError('');
    getMoviesList()
      .then(() => {
        searchMovies(query, isShort, LOADED_KEY, setMoviesItems);
      })
      .catch(() => setMoviesSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => {
        setIsLoading(false);
        setIsDisabled(false);
      });
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
        setSavedMoviesItems([res, ...savedMoviesItems]);
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
      <CurrentUserContext.Provider value={currentUser}>
        <LoadingContext.Provider value={isLoading}>
          <FormDisableContext.Provider value={isDisabled}>
            <Routes>
              <Route path="/" element={<Layout/>}>
                {/*<Route index element={<Homepage/>}/>*/}
                <Route index
                       element={<Main moviesItems={popularMovies} listSize={listSize} btnType="save"
                                      clickHandler={addBtnClickHandler}/>}/>
                <Route path="/movies"
                       element={<ProtectedRouteElement element={Movies} searchKey={LOADED_KEY}
                                                       type='movies'
                                                       listSize={listSize}
                                                       clickHandler={addBtnClickHandler}
                                                       btnType="save"
                                                       filterByShortSwitch={filterByShortSwitch}
                                                       error={moviesSearchError}
                                                       saveHandler={saveMovie}
                                                       deleteHandler={deleteMovie}
                                                       moviesItems={moviesItems}
                                                       onSubmit={searchLoadedMovies}/>}/>
                <Route path="/shows"
                       element={<ProtectedRouteElement element={Movies} searchKey={LOADED_KEY}
                                                       type='shows'
                                                       listSize={listSize}
                                                       clickHandler={addBtnClickHandler}
                                                       btnType="save"
                                                       filterByShortSwitch={filterByShortSwitch}
                                                       error={moviesSearchError}
                                                       saveHandler={saveMovie}
                                                       deleteHandler={deleteMovie}
                                                       moviesItems={moviesItems}
                                                       onSubmit={searchLoadedMovies}/>}/>
                <Route path="/favorites"
                       element={<ProtectedRouteElement element={SavedMovies}
                                                       searchKey={SAVED_KEY}
                                                       moviesItems={savedMoviesItems}
                                                       clickHandler={addBtnClickHandler}
                                                       listSize={listSize}
                                                       deleteHandler={deleteMovie}
                                                       btnType="delete"
                                                       filterByShortSwitch={filterByShortSwitch}
                                                       error={moviesSearchError}
                                                       onSubmit={searchSavedMovies}/>}/>
                <Route path="/profile"
                       element={<ProtectedRouteElement element={Profile}
                                                       error={entryMessage}
                                                       onSubmit={handleChangeProfile}
                                                       onLogout={handleLogout}/>}/>
              </Route>
              {!loggedIn ? <Route path="signin"
                                  element={<Login handleLogin={handleLogin} error={entryMessage}/>}/> : ''}
              {!loggedIn ? <Route path="signup"
                                  element={<Register handleRegister={handleRegister} error={entryMessage}/>}/> : ''}
              <Route path="*" element={<ErrorPage/>}/>
            </Routes>
          </FormDisableContext.Provider>
        </LoadingContext.Provider>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
