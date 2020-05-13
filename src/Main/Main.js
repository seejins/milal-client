import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import VolunteersContext from '../VolunteersContext'
import AddVolunteer from '../AddVolunteer/AddVolunteer';
import Profile from './Profile.jpg';
import addButton from './addButton.png';
import './Main.css';

class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            seen: false
        }
    };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    static contextType = VolunteersContext;

    render() {
        return (
            <section className='main-container'>
                <ul className='main-list'>
                    {this.context.volunteers.map(volunteer =>
                        <li key={volunteer.id}>
                            <NavLink
                                className='volunteer-link'
                                to={`/volunteer/${volunteer.id}`}>
                                <div className='volunteer-container'>
                                    <img className='volunteer-photo' src={Profile} alt={volunteer.name} />

                                    <div className='volunteer-info'>
                                        <h3 className='volunteer-name'>
                                            {volunteer.name}
                                        </h3>
                                    </div>
                                </div>
                            </NavLink>
                        </li>)}
                </ul>

                <div>
                    <div className="btn-volunteer" onClick={this.togglePop}>
                        <img className='add-btn' src={addButton} alt='add volunteer button' />
                    </div>
                    {this.state.seen ? <AddVolunteer toggle={this.togglePop} /> : null}
                </div>
            </section>
        )
    }
}

export default Main;