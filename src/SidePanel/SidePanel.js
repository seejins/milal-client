import React from 'react';
import { NavLink } from "react-router-dom";
import Arrow from './Arrow.png'
import './SidePanel.css';


const sidePanel = props => {
  let panelClasses = 'side-panel';
  if (props.show) {
    panelClasses = 'side-panel open';
  }

  return (
    <nav className={panelClasses}>
      <ul>
        <h3 className='panel-header'>
          Menu
        </h3>
        <li><NavLink to="/" onClick={props.panelClickHandler}>
          <div className='panel-button'>
            Home
          </div>
        </NavLink></li>
        <li><NavLink to="/volunteer" onClick={props.panelClickHandler}>
          <div className='panel-button'>
            Volunteers
          </div>
        </NavLink></li>
        <ul>
          {props.volunteers.map(volunteer => 
            <li key={volunteer.id}>
              <NavLink to={`/volunteer/${volunteer.id}`} onClick={props.panelClickHandler}>
                <div className='panel-volunteer'>
                  <img src={Arrow} alt='arrow' className='arrow'/>
                  {volunteer.name}
                </div>
              </NavLink>
            </li>)}
        </ul>
      </ul>
    </nav>
  );
};

export default sidePanel;