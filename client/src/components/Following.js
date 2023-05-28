import {useState, useEffect, useContext} from 'react'
import { followingContext } from '../FollowingProvider'


function Following(){
    const following = useContext(followingContext)
    console.log(following)
    

    return(
        <div>
            <li>
            </li>
        </div>
    )
}

export default Following