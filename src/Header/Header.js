import React from 'react';
import PanelToggleButton from '../SidePanel/PanelToggleButton';
import { NavLink } from 'react-router-dom';
import './Header.css';


const header = props => (
    <header className='header'>
        <nav className='header-navigation'>
            <div className='header-title'>
                <NavLink to='/'>
                    <h1 className='header-title'>Milal Mission</h1>
                </NavLink>
            </div>
            <div className='header-navigation-items'>
                <ul className='navigation-list'>
                    <li><NavLink className='nav-link' to='/'>
                        <h4>Home</h4>
                    </NavLink></li>
                    <li><NavLink className='nav-link' to='/volunteer'>
                        <h4>Volunteers</h4>
                    </NavLink></li>
                </ul>
            </div>
            <div className='header-toggle-button'>
                <PanelToggleButton click={props.panelClickHandler} />
            </div>
        </nav>
    </header>
)

export default header;