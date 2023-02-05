import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Promo from '../Promo/Promo';
import ErrorPage from '../ErrorPage/ErrorPage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Layout from '../Layout/Layout';
import Profile from '../Profile/Profile';

function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  return (
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn}/>}>
          <Route path="/" element={<Promo/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/saved-movies" element={<SavedMovies/>}/>
        </Route>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
  );
}

export default App;
