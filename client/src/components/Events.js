import EventCard from "./EventCard"
import { useContext } from "react"
import { eventsContext } from "../EventsProvider"


function Events(){
    const [events, setEvents] = useContext(eventsContext)

    const eventCards = events.map((event)=>(
        <EventCard key={event.id} event={event}/>
    ))

    return(
        <div>
            {eventCards}
        </div>
    )
}

export default Events