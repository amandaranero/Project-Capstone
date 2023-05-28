import {useState, useEffect} from 'react'
import '../componentcss/UserCard.css'
import {Link, useParams} from 'react-router-dom'
import User from './User'
// style will change

function UserCard({user}){
    const {name, id, bio, username, userimages} = user
    const [userImages, setUserImages] = useState([])
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState({})


    useEffect(()=>{
        const images = userimages.map((image)=>{
            return image
        })
        setUserImages(images)
    }, [])

    function handleFollower(){
        console.log("hello")
        console.log(id)
        fetch('/follow', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            setFollowing([...following, follower])
            setFollow(follower)
        })
    }

    return(
        <div>
            <h2>hi</h2>
        <div className = 'card'>
            <Link to ={`/users/${id}`}>
                <img className='img' src={userImages[0] ? userImages[0].url : null} alt={`${name}’s photo`} />
            </Link>
            <div className = "title">
                {name}
            </div>
            <div className = 'info'>
                <span> Username: {username}</span>
            </div>
        </div> 
        <div>
                <button onClick={handleFollower}>Follow</button>
            </div>
        </div>
    )
}

export default UserCard