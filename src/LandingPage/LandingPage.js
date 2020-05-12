import React, { Component } from 'react'
import './LandingPage.css'

class LandingPage extends Component {
    render() {
        return (
            <>
            <div className='landing-page-container'>
                <div className='landing-page-description'>
                    <h1 className='landing-page-header'> Milal Application </h1>
                    <p> This application was created with volunteers in mind.  They can keep track of how many hours they have accumulated.  Volunteers can also see the amount and also when they added those specific hours.  In future iterations, there will be an option to create accounts to keep everything more private.  For now, an admin view has been implemented where the leaders of Milal can view their volunteers information.</p>
                </div>
                
            </div>
            </>
        )
    }
}

export default LandingPage