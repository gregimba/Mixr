import React from 'react';
import './Drink.css';

const Drink = props => (
  <div className="drink-page">
    <div className="drink-image">
      <img className="drink-object" src={'drink image url goes here...'} />
    </div>
    <div className="drink-title">{props.drink.name}</div>
    <div className="drink-instruction">{props.drink.instruction}</div>
    <div className="drink-ingredients">{'drink ingredient goes here...'}</div>
    <div className="drink-glass">{props.drink.glass}</div>
    <span className="exit-button" onClick={props.handleClick}>
      &times;
    </span>
  </div>
);

export default Drink;
