import UserCard from "./UserCard"
import {useState, useEffect} from 'react'


// okay first going to render all 
// then i will make sure only the people you follow
// not you

function Users({users}){

    const userCards = users.map((user)=>(
        <UserCard key={user.id} user={user} />
    ))

    return(
        <div>
         {userCards}
        </div>
    )
}

export default Users