import React from 'react'

const VolunteersContext = React.createContext({
    hours: [],
    volunteers: [],
    deleteHours: () => {},
    deleteVolunteer: () => {},
    addVolunteer: () => {},
    addHours: () => {},
})

export default VolunteersContext