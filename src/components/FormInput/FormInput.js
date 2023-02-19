import React from 'react';
import './FormInput.css'

function FormInput(props) {
  return (
    <>
      <label className="form__input-label" htmlFor={props.name}>{props.lableName}</label>
      <input onChange={props.onChange} required={props.required} className="form__input" value={props.value} name={props.name} type={props.type}/>
    </>
  );
}

export default FormInput;
