import React from 'react';
import './Sidebar.css';

const Sidebar = props => (
  <div className="drink-list">
    <div className="dirnk-list-title">Matched Drinks</div>
    {props.drinks.map(drink => (
      <DrinkListEntry
        drink={drink}
        handleClick={() => props.handleClick('drink', drink)}
      />
    ))}
  </div>
);

export default Sidebar;
