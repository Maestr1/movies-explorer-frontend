import React, { useContext } from 'react';
import './FormInput.css'
import ValidationError from '../ValidationError/ValidationError';
import FormDisableContext from '../../context/FormDisableContext';

function FormInput(props) {
  const isDisabled = useContext(FormDisableContext)

  return (
    <div className="form__input-wrapper">
      <label className="form__input-label" htmlFor={props.name}>{props.lableName}</label>
      <input disabled={isDisabled} minLength={props.min} maxLength={props.max} onChange={props.onChange} required={props.required} className="form__input" value={props.value} name={props.name} type={props.type}/>
      {!props.isValid ? <ValidationError text={props.error}/> : ''}
    </div>
  );
}

export default FormInput;
