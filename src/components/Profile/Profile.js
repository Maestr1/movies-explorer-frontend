import React, { useState } from 'react';
import './Profile.css';

function Profile(props) {

  let savedName = 'Дмитрий';
  let savedEmail = 'qwe@qwe.ru';

  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState(savedEmail);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${savedName}!`}</h1>
      <form className="profile__form">
        <div className="profile__inputs-wrapper">
          <div className="profile__input-wrapper">
            <label className="profile__input-label" htmlFor="name">Имя</label>
            <input required onChange={handleChangeName} name="name" className="profile__input" type="text"
                   value={name}/>
          </div>
          <div className="profile__input-wrapper">
            <label className="profile__input-label" htmlFor="email">E-mail</label>
            <input required onChange={handleChangeEmail} name="email" className="profile__input" type="email"
                   value={email}/>
          </div>
        </div>
        <div className="profile__btn-wrapper">
          <button disabled={!(name !== savedName || email !== savedEmail)} type="submit"
                  className="profile__submit-btn btn">Редактировать
          </button>
          <button type="submit"
                  className="profile__logout-btn btn">Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
