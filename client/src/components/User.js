import { useState, useEffect } from 'react'
import '../componentcss/UserCard.css'
import { useParams } from 'react-router-dom'


function User(){
    const [userProfile, setUserProfile] = useState({})
    const [following, setFollowing] = useState([])
    const {name, username, userimages, bio}= userProfile

    let {id} = useParams()

    useEffect(()=>{
        fetch(`/users/${id}`)
        .then((resp)=> resp.json())
        .then((user)=> setUserProfile(user))
    }, [id])

    console.log(userProfile)


    function handleFollower(){
        fetch('/follow', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            console.log(follower)
        })
    }


    return(
        <div>
            <div>
                <button onClick={handleFollower}>Follow</button>
            </div>

        <div className = 'card'>
            <img className='img' src={userimages ? userimages.url : null} alt={`${name}’s photo`} />
            <div className = "title">
                {name}
            </div>
            <div className = 'info'>
                <span> Username: {username}</span>
                <span> Bio: {bio} </span>
            </div>
        </div>

        </div>
    )
}

export default User
