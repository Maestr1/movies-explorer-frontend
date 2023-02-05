import React from 'react';
import './FormInput.css'

function FormInput(props) {
  return (
    <>
      <label className="form__input-label" htmlFor={props.name}>{props.lableName}</label>
      <input className="form__input" name={props.name} type={props.type}/>
    </>
  );
}

export default FormInput;
