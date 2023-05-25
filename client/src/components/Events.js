import EventCard from "./EventCard"


function Events({events}){
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