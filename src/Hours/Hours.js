import React, { Component } from 'react'
import config from '../config'
import VolunteersContext from '../VolunteersContext'
import PropTypes from 'prop-types'

class Hours extends Component {
    static defaultProps = {
        onDeleteNote: () => { },
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

    render() {
        const { id, hours, date_added } = this.props
        return (
            <>
                <div className="hour">
                    <h2 className='hour-title'>

                        {date_added}

                    </h2>

                    <div className='hour-amount'>
                        {hours}
                    </div>

                    <button className='hours-delete' type='button' onClick={this.handleClickDelete}>
                        Delete
                </button>
                </div>
            </>
        )
    }
}

Hours.propTypes = {
    id: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
    date_added: PropTypes.string.isRequired
}

export default Hours