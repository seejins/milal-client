import React, { Component } from 'react'
import VolunteersContext from '../VolunteersContext'
import config from '../config'
import ValidationError from '../ValidationError'
import PropTypes from 'prop-types'
import './AddVolunteer.css'


class AddVolunteer extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            name: {
                value: '',
                touched: 'false'
            }
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    static contextType = VolunteersContext

    handleSubmit = e => {
        e.preventDefault()
        const newVolunteer = {
            name: e.target['volunteer-name'].value
        }

        fetch(`${config.API_ENDPOINT}/api/volunteers`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newVolunteer)
        })

            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                } return res.json()
            })
            .then(volunteer => {
                this.context.addVolunteer(volunteer)
                this.props.history.push(`/volunteer/${volunteer.id}`)
                this.props.toggle()
            })
            .catch(error => {
                console.error({ error })
            })
    }

    updateName(name) {
        this.setState({ name: { value: name, touched: true } })
    }

    validateName() {
        const name = this.state.name.value.trim()
        if (name.length === 0) {
            return 'Name is required.'
        } else if (name.length > 20) {
            return 'Name must be less than 20 characters'
        }
    }

    render() {
        const volunteerError = this.validateName()

        return (
            <div className='add-volunteer'>
                <section className='add-volunteer-content'>
                    <span className='close' onClick={this.handleClick}>&times;</span>
                    <h2 className='add-volunteer-title'>Add a new volunteer</h2>
                    <form className='volunteer-form' action='#' onChange={e => this.updateName(e.target.value)} onSubmit={this.handleSubmit}>
                        <div className='field'>
                            <label htmlFor='volunteer-name'>
                                Name
                        </label>
                            <input type='text' id='volunteer-name' name='volunteer-name' aria-label='volunteer name' />
                            {this.state.name.touched === true && <ValidationError message={volunteerError} />}
                        </div>
                        <div className='buttons'>
                            <button type='submit' className='button' disabled={this.validateName()}>
                                Add Volunteer
                        </button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

AddVolunteer.propTypes = {
    requiredObjectWithShape: PropTypes.shape({
        history: PropTypes.func.isRequired
    })
}

export default AddVolunteer