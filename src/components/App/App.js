import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

function App() {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesItems, setMoviesItems] = useState([]);
  const [moviesSearchError, setMoviesSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  // useEffect(() => {
  //   authorize()
  //     .then(userInfo => {
  //       // debugger
  //       setCurrentUser(userInfo);
  //       console.log('auth');
  //     })
  //     .catch(() => {
  //       console.log('Ошибка авторизации');
  //     })
  // }, []);
  //
  // const authorize = async () => {
  //   try {
  //     await mainApi.auth();
  //     setLoggedIn(true);
  //   } catch (err) {
  //     setLoggedIn(false);
  //   }
  // };
  function checkAuth() {
    mainApi.auth()
      .then(userInfo => {
        setLoggedIn(true);
        setCurrentUser(userInfo);
        console.log('auth');
      })
      .catch(() => {
        setLoggedIn(false);
        console.log('Ошибка авторизации');
      });
  }

  function handleLogin(password, email) {
    mainApi.login({ password, email })
      .then(() => setLoggedIn(true))
      .then(() => navigate('/movies'))
      .catch(err => console.log(`Ошибка авторизации. Код ошибки: ${err}`));
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => setLoggedIn(false))
      .then(() => navigate('./signin'))
      .catch(err => console.log(err));
  }

  function handleRegister(name, password, email) {
    mainApi.register({ name, email, password })
      .then(() => {
        navigate('/signin');
      })
      .catch(err => console.log(`Ошибка регистрации. Код ошибки: ${err}`));
  }

  function moviesFilter(list, query, isShort) {
    return list.filter((movie) => {
      return isShort ? movie.duration <= 40 : movie.duration > 40 && (movie.nameEN.toLowerCase().includes(query.toLowerCase()) || movie.nameRU.toLowerCase().includes(query.toLowerCase()));
    });
  }

  function searchMovies(query, isShort) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then(res => {
        const searchResult = moviesFilter(res, query, isShort);
        if (searchResult.length) {
          setMoviesSearchError('');
          localStorage.setItem('movies', JSON.stringify(searchResult));
          setMoviesItems(searchResult);
        } else {
          localStorage.removeItem('movies');
          setMoviesItems([]);
          setMoviesSearchError('Ничего не найдено');
        }
      })
      .catch(() => setMoviesSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'))
      .finally(() => setIsLoading(false));

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
                     element={<ProtectedRouteElement element={Movies} error={moviesSearchError}
                                                     moviesItems={moviesItems}
                                                     onSubmit={searchMovies}/>}/>
              <Route path="/saved-movies"
                     element={<ProtectedRouteElement element={SavedMovies} onSubmit={searchMovies}/>}/>
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
