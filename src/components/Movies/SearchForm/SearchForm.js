import React from 'react';
import './SearchForm.css'

function SearchForm(props) {
  return (
    <section className="searchForm">
      <form className="searchForm__form">
        <input className="searchForm__input" type="text"/>
      </form>
    </section>
  );
}

export default SearchForm;
