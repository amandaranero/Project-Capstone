import { useContext } from 'react';
import { userEventContext } from '../UserEventProvider';
import EventForm from './EventForm'
import UserEventCard from './UserEventCard';


function UserEvents(){
    const [userEvent, setUserEvent] = useContext(userEventContext)

    const userEventCards = userEvent?.map((event)=>(
        <UserEventCard key={event.id} event={event}/>
    ))

    return(
        <div>
            <nav>
                <EventForm/>
            </nav>
            <div>
            <h2>hh</h2>
            {userEventCards}
        <div className = 'card'>
                {/* <img className='img' src={eventImages[0] ? eventImages[0].url : null} alt={`${name}’s photo`} /> */}
            <div className = "title">
                {/* {name} */}
            </div>
            <div className = 'info'>
                {/* <span> {description}</span> */}
            </div>
        </div> 
        </div>
        </div>
    )
}

export default UserEvents