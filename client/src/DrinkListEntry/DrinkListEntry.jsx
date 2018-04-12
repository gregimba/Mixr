import React from 'react';
import './DrinkListEntry.css';

const DrinkListEntry = (props) => (
  <div className="drink-list-entry">
    <div className="drink-list-entry-images">
      <img className="drink-list-entry-object" src={'images url goes here...'} onClick={() => props.click(props.drink)}/>
    </div> 
      <div className="drink-list-entry-title"></div>
  </div>
)

export default DrinkListEntry;