import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import VolunteersContext from '../VolunteersContext'
import './Sidebar.css'


class Sidebar extends Component {
    static contextType = VolunteersContext

    render() {
        return (
            <section className="sidebar-container">
                <ul className="sidebar-list">
                    {this.context.volunteers.map(volunteer =>
                        <li key={volunteer.id}>
                            <NavLink
                                className='volunteer-name'
                                to={`/volunteer/${volunteer.id}`}>
                                {volunteer.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </section>
        )
    }
}

export default Sidebar