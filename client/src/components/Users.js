import UserCard from "./UserCard"
import {useState, useEffect, useContext} from 'react'
import { usersContext } from "../UsersProvider"


// okay first going to render all 
// then i will make sure only the people you follow
// not you

function Users(){
    const [users, setUsers] = useContext(usersContext)

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