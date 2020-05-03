import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import VolunteersContext from '../VolunteersContext'
import './Main.css'

class Main extends Component {

    static contextType = VolunteersContext

    render() {
        return (
            <section className='main-container'>
                <ul className='main-list'>
                    {this.context.volunteers.map(volunteer =>
                        <li key={volunteer.id}>
                            <NavLink
                                className='volunteer-name'
                                to={`/volunteer/${volunteer.id}`}>
                                {volunteer.name}
                            </NavLink>
                        </li>)}
                </ul>
            </section>
        )
    }
}

export default Main