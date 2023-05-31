import EventCard from "./EventCard"
import { useContext } from "react"
import { eventsContext } from "../EventsProvider"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';




function Events(){
    const [events] = useContext(eventsContext)

    const eventCards = events.map((event)=>(
        <EventCard key={event.id} event={event}/>
    ))

    return(
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {eventCards}
            </Box>
    )
}

export default Events