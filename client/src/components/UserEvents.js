import '../componentcss/UserCard.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';


function UserEvents(){
    const [userevents, setUserevents] = useState([])
    const [userEvent, setUserEvent] = useState([])
    

  


    // GETS EVENTS FOR USER SESSION:
  
    // useEffect(()=>{
    //   fetch('/userevents')
    //   .then((resp)=>{
    //     if(resp.ok){
    //       resp.json()
    //       .then((data)=>{
    //         setUserevents(data)
    //       })
    //     }
    //   })
    // }, [])


    // useEffect(()=>{
    //     const event = userevents.map((userevent)=>{
    //         return userevent
    //     })
    //     setUserEvent(event)
    // },[])

    // console.log(userEvent)
    




   
    //userevent coming up undefined everytime
    return(
        <div>
            <nav>
                <Link to = {'/eventform'}>
                    <button>Add an Event</button>
                </Link>
            </nav>
            <div>
            <h2>hi</h2>
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