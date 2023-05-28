import '../componentcss/UserCard.css'
import {useState, useEffect} from "react"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import CommentForm from './CommentForm'

function EventCard({event}){
    const {name, description, date, time, event_type, eventimages, id} = event
    const [eventImages, setEventImages] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const images = eventimages.map((image)=>{
            return image
        })
        setEventImages(images)
    }, [])


    function handleClick(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }


    return(
        <div>
            <div>
            <h2>hi</h2>
        <div className = 'card'>
                <img className='img' src={eventImages[0] ? eventImages[0].url : null} alt={`${name}’s photo`} />
            <div className = "title">
                {name}
            </div>
            <div className = 'info'>
                <span> {description}</span>
            </div>
        </div> 
        </div>
            <button onClick={handleClick}>More Info</button>
        </div>
    )
}

export default EventCard