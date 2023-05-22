import {useState, useEffect} from 'react'
import '../componentcss/UserCard.css'
import {Link} from 'react-router-dom'
import User from './User'
// style will change

function UserCard({user}){
    const {name, username, userimages, bio, id}= user
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
        console.log(id)
        console.log("click")
        fetch('/follow', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            setFollowing(following.concat(follower))
            setFollow(follower)
        })
    }

    console.log(following)

    return(
        <div>
        <User key={user.id} user={user}/>
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
            <div>
                <button onClick={handleFollower}>Follow</button>
            </div>
        </div>
        </div>
    )
}

export default UserCard