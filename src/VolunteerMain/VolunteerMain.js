import React, { Component } from 'react'
import Hours from '../Hours/Hours'
import VolunteersContext from '../VolunteersContext'
import { Link } from 'react-router-dom'
import PropType from 'prop-types'
import Profile from '../Main/Profile.jpg'
import './VolunteerMain.css'


class VolunteerMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = VolunteersContext

    render() {
        const { volunteerId } = this.props.match.params
        const { hours = [] } = this.context
        const { volunteers = [] } = this.context
        const filteredHours = hours.filter(hours => hours.volunteer_id == volunteerId)
        const filteredVolunteer = volunteers.filter(volunteer => volunteer.id == volunteerId)
        return (
            <>
                <div className='hours-container'>
                    {console.log(filteredVolunteer)}
                    <div className='volunteer-header'>
                        <img className='volunteer-photo' src={Profile} alt={filteredVolunteer.map(volunteer => volunteer.name)} />
                        <h2 className='volunteer-name'> {filteredVolunteer.map(volunteer => volunteer.name)} </h2>
                    </div>
                    <ul className='hours-list-container'>
                        {filteredHours.map(hours =>
                            <li className='hours-list' key={hours.id}>
                                <Hours
                                    id={hours.id}
                                    hours={hours.hours}
                                    date_added={hours.date_added}
                                />
                            </li>
                        )}
                    </ul>
                    <div className='add-hours-container'>
                        <Link
                            className='add-hours-link'
                            id={volunteerId}
                            to={'/add-hours'}>
                            Add Hours
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

VolunteerMain.propTypes = {
    match: PropType.object.isRequired
}

export default VolunteerMain