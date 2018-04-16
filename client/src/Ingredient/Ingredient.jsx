import React from 'react';
import './Ingredient.css';

const Ingredient = props => (
  <div className="ingredient-container">
    <div className="ingredient">
      <img
        className="ingredient-image"
        src={'ingredient images url goes here...'}
      />
      <div className="ingredient-name">{props.ingredient}</div>
    </div>
    <div className="buttonContainer">
      <button className="button" onClick={() => props.like()}>
        LIKE
      </button>
      <button className="button" onClick={() => props.dislike()}>
        DISLIKE
      </button>
    </div>
  </div>
);

export default Ingredient;
