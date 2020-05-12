import React, { Component } from 'react'
import VolunteersContext from '../VolunteersContext'
import config from '../config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'
import './AddHours.css'

class AddHours extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            hours: {
                value: '',
                touched: 'false',
            },

            date_added: {
                value: '',
                touched: 'false',
            },

            volunteer: {
                value: `${this.props.volunteerId}`,
                touched: 'false',
            }
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    static contextType = VolunteersContext

    handleSubmit = e => {
        e.preventDefault()
        const newHour = {
            hours: e.target['hours-amount'].value,
            date_added: new Date(),
            volunteer_id: e.target['volunteer-id'].value,
        }

        fetch(`${config.API_ENDPOINT}/api/hours`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newHour)
        })

            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(hour => {
                this.context.addHours(hour)
                this.props.history.push(`/volunteer/${hour.volunteer_id}`)
                this.props.toggle()
            })
            .catch(error => {
                console.error({ error })
            })
    }

    updateHour(hour) {
        this.setState({ hours: { value: hour, touched: true } })
    }

    updateVolunteer(volunteer) {
        this.setState({ volunteer: { value: volunteer, touched: true } })
        console.log(this.state.volunteer)
    }

    validateHours() {
        const hour = this.state.hours.value.trim()
        if (isNaN(hour) === true) {
            return 'Hours must be a number.'
        } else if (hour <= 0 || hour > 24) {
            return 'Hours must be a number between 0 and 24 '
        }
    }

    validateVolunteer() {
        const volunteer = this.state.volunteer.value.trim()
        console.log(volunteer)
        console.log(this.state.volunteer.touched)
        if (isNaN(volunteer) === true) {
            return 'Volunteer is required'
        } else if (volunteer === '') {
            return 'Volunteer is required'
        }
    }

    render() {
        const { volunteers = [] } = this.context
        const volunteer = this.props.volunteer
        const volunteerId = this.props.volunteerId
        const filteredList = volunteers.filter(volunteers => volunteers.id != volunteerId)
        return (
            <div className='add-container'>
                <section className='add-content'>
                    <span className='close' onClick={this.handleClick}>&times;</span>
                    <h2 className='add-title'>Add Hours</h2>
                    <form className='add-form-hours' action='#' onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <label htmlFor='hours-amount'>
                                Amount:
                            </label>

                            <input type='text' id='hours-amount' name='hours-amount' onChange={e => this.updateHour(e.target.value)} />
                            {this.state.hours.touched === true && <ValidationError message={this.validateHours()} />}
                        </div>
                        <div className='field'>
                            <label htmlFor='volunteer-select'>
                                Volunteer:
                            </label>

                            <select id='volunteer-id' name='volunteer-id' aria-label='Volunteer to add hours' onChange={e => this.updateVolunteer(e.target.value)}>
                                <option value={volunteerId}>{volunteer}</option>
                                {filteredList.map(volunteer =>
                                    <option key={volunteer.id} value={volunteer.id}>
                                        {volunteer.name}
                                    </option>
                                )}
                            </select>
                            {this.state.volunteer.touched === true && <ValidationError message={this.validateVolunteer()} />}
                        </div>
                        <div className='buttons'>
                            <button type='submit' className='button' disabled={this.validateHours() || this.validateVolunteer()}>
                                Add Hours
                        </button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

AddHours.propTypes = {
    requiredObjectWithShape: PropTypes.shape({
        history: PropTypes.func.isRequired
    })
}

export default AddHours