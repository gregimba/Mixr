import React from 'react';
import './main.css';

const Main = (props) => (
  <div className="ingredient-container">
    <div className="ingredient">
      <div className="ingredient-name">{props.ingredient}</div>
    </div>
  </div>

)

export default Main;