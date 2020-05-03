import React from 'react';
import { NavLink } from "react-router-dom";
import './SidePanel.css';


const sidePanel = props => {
  let panelClasses = 'side-panel';
  if (props.show) {
    panelClasses = 'side-panel open';
  }

  return (
    <nav className={panelClasses}>
      <ul>
        <li><NavLink to="/" onClick={props.panelClickHandler}>Home</NavLink></li>
        <li><NavLink to="/volunteer" onClick={props.panelClickHandler}>Volunteers</NavLink></li>
        <li><NavLink to="/add-volunteer" onClick={props.panelClickHandler}>Add Volunteer</NavLink></li>
        <li><NavLink to="/add-hours" onClick={props.panelClickHandler}>Add Hours</NavLink></li>
      </ul>
    </nav>
);
};

export default sidePanel;