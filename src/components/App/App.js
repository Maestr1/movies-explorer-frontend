import './App.css';
import Header from '../Header/Header';
import React from 'react';

export default function App() {

  function clickHandler() {
    console.log('click')
  }

  return (
    <div>
      <Header onClick={clickHandler}/>
    </div>
  );
}

