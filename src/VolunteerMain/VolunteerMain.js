import React, { Component } from 'react';
import Hours from '../Hours/Hours';
import VolunteersContext from '../VolunteersContext';
import goBack from './goBack.png';
import addButton from '../Main/addButton.png';
import config from '../config';
import PropType from 'prop-types';
import AddHours from '../AddHours/AddHours';
import './VolunteerMain.css';


class VolunteerMain extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            goBack: () => { }
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            seen: false,
            total_hours: []
        }
    };

    componentDidMount() {
        const volunteerId = this.props.match.params.volunteerId
        fetch(`${config.API_ENDPOINT}/api/volunteers/${volunteerId}`)
            .then(res => res.json())
            .then(volunteer => {
                this.setState({ total_hours: volunteer.total_hours })
            })
    };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    static contextType = VolunteersContext;

    render() {
        const { volunteerId } = this.props.match.params
        const totalHours = this.state.total_hours
        const { hours = [] } = this.context
        const { volunteers = [] } = this.context
        const filteredHours = hours.filter(hours => hours.volunteer_id == volunteerId)
        const filteredVolunteer = volunteers.filter(volunteer => volunteer.id == volunteerId)
        return (
            <>
                <div className='hours-container'>
                    <div className='volunteer-header'>
                        <img className='goBack' src={goBack} alt={filteredVolunteer.map(volunteer => volunteer.name) } onClick={() => this.props.history.goBack()}/>
                        <div className='volunteer-header-content'>
                            <h2 className='volunteer-name'> {filteredVolunteer.map(volunteer => volunteer.name)} </h2>
                            <div className='volunteer-total-hours'>
                                Total Hours: {totalHours}
                            </div>
                        </div>
                        <div className='add-hours-button' onClick={this.togglePop}>
                            <h3>+ Add Hours</h3>
                        </div>
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
                    <div>
                        <div className="btn" onClick={this.togglePop}>
                            <img className='add-btn' src={addButton} alt='add hours button' />
                        </div>
                        {this.state.seen ? <AddHours toggle={this.togglePop} volunteerId={filteredVolunteer.map(volunteer => volunteer.id)} volunteer={filteredVolunteer.map(volunteer => volunteer.name)} /> : null}
                    </div>
                </div>
            </>
        )
    }
}

VolunteerMain.propTypes = {
    match: PropType.object.isRequired
};

export default VolunteerMain;