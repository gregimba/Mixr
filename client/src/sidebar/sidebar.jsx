import React from 'react';
import './Sidebar.css';

const Sidebar = props => (
  <div className="drink-list">
    <div className="dirnk-list-title" onClick={props.handleClick}>
      {props.drink}
    </div>
    <div>
      <img
        className="drink-list-entry-object"
        src={'images url goes here...'}
        onClick={props.handleClick}
      />
    </div>
  </div>
);

export default Sidebar;
