import React from 'react';
import './Drink.css';

const Drink = (props) => (
  <div className="drink-page">
    Drink page goes here...
    <div className="drink-image">
      <img className="drink-object"/>
    </div>  
    <div className="drink-title"></div>
    <div className="drink-instruction"></div>
    <div className="drink-ingredients"></div>
    <div className="drink-glass"></div>    
    <span className="exit-button" onClick={() => props.exit()}>&times;</span>
  </div>
)

export default Drink;
