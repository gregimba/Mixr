import React from 'react';
import './DrinkListEntry.css';

const DrinkListEntry = props => (
  <div className="drink-list-entry">
    <div className="drink-list-entry-image">
      <img
        src={props.drink.image}
        alt=""
        onClick={props.handleClick('drink', props.drink)}
      />
    </div>
    <div className="drink-list-entry-title">
      <span onClick={() => {props.handleClick('drink', props.drink)}}>
        {props.drink.name}
        test
      </span>
    </div>
  </div>
);

export default DrinkListEntry;
