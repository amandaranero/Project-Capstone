import '../componentcss/UserCard.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react';


function UserEvents(){

   

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