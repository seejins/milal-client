import React from 'react'

const VolunteersContext = React.createContext({
    hours: [],
    volunteers: [],
    deleteHours: () => {},
    addVolunteer: () => {},
    addHours: () => {},
})

export default VolunteersContext