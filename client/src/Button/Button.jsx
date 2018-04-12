import React from 'react';
import './Button.css';

const Button = (props) => (
  <div className="buttonContainer">
      <button className="button" onClick={() => props.like()}>LIKE</button>
      <button className="button" onClick={() => props.dislike()}>DISLIKE</button>        
  </div>

)

export default Button;