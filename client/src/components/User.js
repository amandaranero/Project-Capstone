import { useState, useEffect } from 'react'
import '../componentcss/UserCard.css'
import { Navigate, useParams, Link } from 'react-router-dom'
import MessageForm from './MessageForm'
// import Messages from './Messages'


function User(){
    const [userProfile, setUserProfile] = useState({})
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState({})
    const {name, username, userimages, bio}= userProfile
    const [messages, setMessages] = useState([])

    let {id} = useParams()
    
    useEffect(()=>{
        fetch(`/messages/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((messages)=>{
                    setMessages(messages)
                })
            }
        })
    }, [])

    
    

    useEffect(()=>{
        fetch(`/users/${id}`)
        .then((resp)=> resp.json())
        .then((user)=> setUserProfile(user))
    }, [id])


    function handleMessage(){
        //open up message form and all messages
        console.log(id)
    }


    function handleFollower(){

        fetch('/follow', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            console.log("click")
            setFollow(follower)
            const newFollower = [...following, follower]
            setFollowing(newFollower)
        })
    }


    return(
        <div>
            <h2>{name}</h2>
        <div className = 'card'>
                {/* <img className='img' src={userImages[0] ? userImages[0].url : null} alt={`${name}’s photo`} /> */}
            <div className = "title">
                {userProfile.name}
            </div>
            <div className = 'info'>
                <span> Username: {userProfile.username}</span>
            </div>
        </div>
        
        
        <div>
                <button onClick={handleFollower}>Follow</button>
            <div>
                <button onClick={handleMessage}>Message</button>
            </div>
    
            <MessageForm id={id}/>
            {messages}
        </div>
        </div>
    )
}

export default User
