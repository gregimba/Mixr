import React from 'react';
import './Ingredient.css';

const Ingredient = props => (
  <div className="ingredient-container">
    <div className="ingredient">
      <img className="ingredient-image" src={props.ingredient.image} alt="" />
      <div className="ingredient-name">{props.ingredient.name}</div>
      <div className="ingredient-description">
        {props.ingredient.description}
      </div>
    </div>
    <div className="buttonContainer">
      <button className="button" onClick={() => props.dislike()}>
        DISLIKE
      </button>
      <button className="button" onClick={() => props.like()}>
        LIKE
      </button>
    </div>
  </div>
);

export default Ingredient;
