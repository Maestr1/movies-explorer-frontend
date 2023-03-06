import React, { useContext, useEffect } from 'react';
import './Profile.css';
import CurrentUserContext from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../../hook/useFormWithValidation';
import ValidationError from '../ValidationError/ValidationError';
import FormDisableContext from '../../context/FormDisableContext';
import { SUCCESS_PATCH_MESSAGE } from '../../utils/constants';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const isDisabled = useContext(FormDisableContext)
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

  useEffect(() => {
    setValues({ ...values, name: currentUser.name, email: currentUser.email });
  }, [currentUser.email, currentUser.name]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.name || !values.email) {
      return;
    }
    props.onSubmit(values);
  }

  function handleLogout(e) {
    e.preventDefault();
    props.onLogout();
  }

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form">
          <div className="profile__inputs-wrapper">
            <div className="profile__input-wrapper">
              <label className="profile__input-label" htmlFor="name">Имя</label>
              <input required disabled={isDisabled} onChange={handleChange} id="name" name="name" className="profile__input" type="text"
                     value={values.name}/>

            </div>
            <div className="profile__input-wrapper">
              <label className="profile__input-label" htmlFor="email">E-mail</label>
              <input required disabled={isDisabled} onChange={handleChange} id="email" name="email" className="profile__input"
                     type="email"
                     value={values.email}/>

            </div>
            {!props.isValid ? <ValidationError className={'error_type_profile'} text={errors.name}/> : ''}
            {!props.isValid ? <ValidationError className={'error_type_profile'} text={errors.email}/> : ''}
          </div>
          <div className="profile__btn-wrapper">
            {props.error ? <p className={`profile__message ${props.error === SUCCESS_PATCH_MESSAGE ? 'profile__message_success' : ''}`}>{props.error}</p> : ''}
            <button disabled={(values.name === currentUser.name && values.email === currentUser.email) || !isValid || isDisabled}
                    type="submit" onClick={handleSubmit}
                    className="profile__submit-btn btn">Редактировать
            </button>
            <button onClick={handleLogout}
                    className="profile__logout-btn btn">Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
