import React from 'react'
import PanelToggleButton from '../SidePanel/PanelToggleButton'
import { NavLink } from 'react-router-dom'
import './Header.css'


const header = props => (
    <header className='header'>
        <nav className='header-navigation'>
            <div className='header-title'>
                <h1>Milal Mission</h1>
            </div>
            <div className='header-navigation-items'>
                <ul>
                    <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
                    <li><NavLink className='nav-link' to='/volunteer'>Volunteers</NavLink></li>
                    <li><NavLink className='nav-link' to='/add-volunteer'>Add Volunteer</NavLink></li>
                    <li><NavLink className='nav-link' to='/add-hours'>Add Hours</NavLink></li>
                </ul>
            </div>
            <div className='header-toggle-button'>
                <PanelToggleButton click={props.panelClickHandler} />
            </div>
        </nav>
    </header>
)

export default header