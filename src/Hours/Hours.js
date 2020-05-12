import React, { Component } from 'react'
import config from '../config'
import VolunteersContext from '../VolunteersContext'
import PropTypes from 'prop-types'
import './Hours.css'

class Hours extends Component {
    static defaultProps = {
        onDeleteHours: () => { },
    }

    constructor(props) {
        super(props)
        this.state = {
            seen: false
        }
    }

    static contextType = VolunteersContext

    handleClickDelete = e => {
        e.preventDefault()
        const hourId = this.props.id

        fetch(`${config.API_ENDPOINT}/api/hours/${hourId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })

            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
                this.context.deleteHours(hourId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        const { hours, date_added } = this.props
        return (
            <>
                <div className="hour">
                    <h3 className='hour-title'>

                        {date_added}

                    </h3>
                    <div className='hour-content'>
                        <div className='hour-amount'>
                            Hours: {hours}
                        </div>

                        <button className='hours-delete' type='button' onClick={this.handleClickDelete}>
                            <span className='delete'>&times;</span>
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

Hours.propTypes = {
    id: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    date_added: PropTypes.string.isRequired
}

export default Hours