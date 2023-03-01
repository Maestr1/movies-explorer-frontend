import React from 'react';
import './ValidationError.css'

function ValidationError(props) {
  return (
    <p className="error">{props.text}</p>
  );
}

export default ValidationError;
