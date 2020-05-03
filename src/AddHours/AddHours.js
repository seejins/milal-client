import React, { Component } from 'react'
import VolunteersContext from '../VolunteersContext'
import config from '../config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'

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
                value: '',
                touched: 'false',
            }
        }
    }

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
            })
            .catch(error => {
                console.error({ error })
            })
    }

    updateHour(hour) {
        this.setState({ hours: { value: hour, touched: true } })
    }

    validateHours() {
        const hour = this.state.hours.value.trim()
        if (isNaN(hour) === true) {
            return 'Hours must be a number.'
        } else if (hour <= 0 || hour > 24) {
            return 'Hours must be a number between 0 and 24 '
        }
    }

    render() {
        const { volunteers = [] } = this.context
        return (
            <section className='AddHours'>
                <h2>Add Hours</h2>
                <form className='hours-form' action='#' onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='hours-amount'>
                            Amount
                        </label>
                        <input type='text' id='hours-amount' name='hours-amount' onChange={e => this.updateHour(e.target.value)} />
                        {this.state.hours.touched === true && <ValidationError message={this.validateHours()} />}
                    </div>
                    <div className='field'>
                        <label htmlFor='volunteer-select'>
                            Volunteer
                        </label>
                        <select id='volunteer-id' name='volunteer-id' aria-label='Volunteer to add hours' required>
                            <option value={null}>Select Volunteer </option>
                            {volunteers.map(volunteer =>
                                <option key={volunteer.id} value={volunteer.id}>
                                    {volunteer.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit' className='button' disabled={this.validateHours}>
                            Add Hours
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

AddHours.propTypes = {
    requiredObjectWithShape: PropTypes.shape({
        history: PropTypes.func.isRequired
    })
}

export default AddHours