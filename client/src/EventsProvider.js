import {createContext, useState} from 'react'

export const eventsContext = createContext()

const EventsProvider = ({children})=>{
    const [events, setEvents] = useState([])

    return(

        <eventsContext.Provider value={([events, setEvents])}>
            {children}
        </eventsContext.Provider>

    )
}

export default EventsProvider