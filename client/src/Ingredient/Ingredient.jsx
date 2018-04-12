import React from 'react';
import './Ingredient.css';

const Ingredient = (props) => (
  <div className="ingredient-container">
    <div className="ingredient">
      <div className="ingredient-name">{props.ingredient}</div>
    </div>
  </div>

)

export default Ingredient;