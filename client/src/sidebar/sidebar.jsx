import React from 'react';
import './sidebar.css';

const Sidebar = (props) => (
  <div className="drink-list">
  {props.drinks.map((drink) => <Match drinks={drink}  click={props.click}/> )}
  
  </div>

)


export default Sidebar;