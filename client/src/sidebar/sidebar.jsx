import React from 'react';
import DrinkListEntry from '../DrinkListEntry/DrinkListEntry';
import './Sidebar.css';

const Sidebar = props => (
  <div className="drink-list">
    {props.drinks.map(drink => (
      <DrinkListEntry
        key={drink.id}
        drink={drink}
        handleClick={props.handleClick}
      />
    ))}
  </div>
);

export default Sidebar;
