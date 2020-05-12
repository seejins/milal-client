import React, { Component, Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Main from './Main/Main'
import VolunteerMain from './VolunteerMain/VolunteerMain'
import AddHours from './AddHours/AddHours'
import AddVolunteer from './AddVolunteer/AddVolunteer'
import SidePanel from './SidePanel/SidePanel'
import Header from './Header/Header'
import Backdrop from './Backdrop/Backdrop'
import config from './config'
import ErrorBoundary from './ErrorBoundary'
import VolunteersContext from './VolunteersContext'
import './App.css'


class App extends Component {
  state = {
    hours: [],
    volunteers: [],
    sidePanelOpen: false
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/hours`),
      fetch(`${config.API_ENDPOINT}/API/volunteers`),
    ])
      .then(([hoursRes, volunteersRes]) => {
        if (!hoursRes.ok)
          return hoursRes.json().then(e => Promise.reject(e))
        if (!volunteersRes.ok)
          return volunteersRes.json().then(e => Promise.reject(e))

        return Promise.all([hoursRes.json(), volunteersRes.json()])
      })
      .then(([hours, volunteers]) => {
        this.setState({ hours, volunteers })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleDeleteHours = hoursId => {
    this.setState({
      hours: this.state.hours.filter(hours => hours.id !== hoursId)
    })
  }

  handleDeleteVolunteer = volunteerId => {
    this.setState({
      volunteers: this.state.volunteers.filter(volunteers => volunteers.id !== volunteerId)
    })
  }

  handleAddHours = hours => {
    this.setState({
      hours: [
        ...this.state.hours,
        hours
      ]
    })
  }

  handleAddVolunteer = volunteer => {
    this.setState({
      volunteers: [
        ...this.state.volunteers,
        volunteer
      ]
    })
  }

  panelToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sidePanelOpen: !prevState.sidePanelOpen }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sidePanelOpen: false })
  }

  getMainRoute() {
    return (
      <>

        <Route
          exact path='/'
          key='/'
          component={LandingPage}
        />

        <Route
          exact path='/volunteer/:volunteerId'
          key='/volunteer/:volunteerId'
          component={VolunteerMain}
        />

        <Route
          exact path='/volunteer'
          key='/volunteer'
          component={Main}
        />

        <Route
          exact path='/add-hours'
          component={AddHours}
        />

        <Route
          exact path='/add-volunteer'
          component={AddVolunteer}
        />


      </>
    )

  }

  render() {
    
    let backdrop
    if (this.state.sidePanelOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    const contextValues = {
      hours: this.state.hours,
      volunteers: this.state.volunteers,
      deleteHours: this.handleDeleteHours,
      deleteVolunteer: this.handleDeleteVolunteer,
      addHours: this.handleAddHours,
      addVolunteer: this.handleAddVolunteer
    }

    return (
      <Fragment>
        <div style={{ height: '100%' }}>
          <Header panelClickHandler={this.panelToggleClickHandler} />
          <SidePanel show={this.state.sidePanelOpen} panelClickHandler={this.panelToggleClickHandler} volunteers={this.state.volunteers} />
          {backdrop}
        </div>


        <div className='App'>
          <VolunteersContext.Provider value={contextValues}>

            <ErrorBoundary>
              <main className='app-main'>
                {this.getMainRoute()}
              </main>
            </ErrorBoundary>
          </VolunteersContext.Provider>

        </div>
      </Fragment>
    )
  }
}

export default App;
