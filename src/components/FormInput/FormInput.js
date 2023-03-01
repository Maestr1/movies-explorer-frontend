import React from 'react';
import './FormInput.css'
import ValidationError from '../ValidationError/ValidationError';

function FormInput(props) {



  return (
    <div className="form__input-wrapper">
      <label className="form__input-label" htmlFor={props.name}>{props.lableName}</label>
      <input minLength={props.min} maxLength={props.max} onChange={props.onChange} required={props.required} className="form__input" value={props.value} name={props.name} type={props.type}/>
      {!props.isValid ? <ValidationError text={props.error}/> : ''}
    </div>
  );
}

export default FormInput;
