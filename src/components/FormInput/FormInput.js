import React from 'react';
import './FormInput.css'

function FormInput(props) {
  return (
    <>
      <label className="form__input-label" htmlFor={props.name}>{props.lableName}</label>
      <input required={props.required} className="form__input" id={props.name} name={props.name} type={props.type}/>
    </>
  );
}

export default FormInput;
