import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'


function Following({following}){

    return(
        <div>
            <li>
                {following}
            </li>
        </div>
    )
}

export default Following