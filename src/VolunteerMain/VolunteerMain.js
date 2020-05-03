import React, { Component } from 'react'
import Hours from '../Hours/Hours'
import VolunteersContext from '../VolunteersContext'
import { Link } from 'react-router-dom'
import PropType from 'prop-types'


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
        const filteredHours = hours.filter(hours => hours.volunteer_id == volunteerId)
        return (
            <>
                <ul className='hours-list'>
                    {filteredHours.map(hours =>
                        <li key={hours.id}>
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

            </>
        )
    }
}

VolunteerMain.propTypes = {
    match: PropType.object.isRequired
}

export default VolunteerMain