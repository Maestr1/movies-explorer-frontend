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
import { CurrentUserProvider } from '../../hoc/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRouteElement from '../../hoc/ProtectedRoute';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesList, setMoviesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  function checkAuth() {
    mainApi.auth()
      .then(userInfo => {
        setLoggedIn(true);
        setCurrentUser(userInfo);
        console.log('auth');
      })
      .catch(() => console.log('Ошибка авторизации'));
  }

  useEffect(() => {
    moviesApi.getMovies()
      .then(res => setMoviesList(res));
  }, []);

  function handleLogin(password, email) {
    mainApi.login({ password, email })
      .then(() => setLoggedIn(true))
      .then(() => navigate('/movies'))
      .catch(err => console.log(err));
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
      .catch(err => {
        console.log(`Ошибка регистрации. Код ошибки: ${err}`);
      });
  }


  return (
    <CurrentUserProvider value={currentUser}>
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn}/>}>
          <Route index element={<Homepage/>}/>
          <Route path="/movies"
                 element={<ProtectedRouteElement element={Movies} movies={moviesList} loggedIn={loggedIn}/>}/>
          <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn}/>}/>
          <Route path="/profile"
                 element={<ProtectedRouteElement element={Profile} loggedIn={loggedIn} onLogout={handleLogout}/>}/>
        </Route>
        <Route path="signin" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="signup" element={<Register handleRegister={handleRegister}/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </CurrentUserProvider>
  );
}

export default App;
