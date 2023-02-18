import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Layout from '../Layout/Layout';
import Profile from '../Profile/Profile';
import Homepage from '../Homepage/Homepage';
import moviesApi from '../../utils/MoviesApi';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    moviesApi.getMovies()
      .then(res => setMoviesList(res))
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn}/>}>
          <Route index element={<Homepage/>}/>
          <Route path="/movies" element={<Movies movies={moviesList}/>}/>
          <Route path="/saved-movies" element={<SavedMovies/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
  );
}

export default App;
