import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'


function Followers({followers}){

    return(
        <div>
            <li>
                {followers}
            </li>
        </div>
    )
}

export default Followers