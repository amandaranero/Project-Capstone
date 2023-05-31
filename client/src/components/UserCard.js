import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import User from './User'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function UserCard({user}){
    const {name, id, bio, username, userimages} = user
    const [userImages, setUserImages] = useState([])
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState({})

    const images = userimages?.map((image)=>{
            return image
    })
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate(`/users/${id}`)
        return <User user={user} />
    }

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
        <Card sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={images[0] ? images[0].url : null} 
            alt={`${name}’s photo`}
            onClick = {handleClick}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {username}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    )
}

export default UserCard

    //     <div>
    //         <h2>hi</h2>
    //     <div className = 'card'>
    //         <Link to ={`/users/${id}`}>
    //             <img className='img' src={userImages[0] ? userImages[0].url : null} alt={`${name}’s photo`} />
    //         </Link>
    //         <div className = "title">
    //             {name}
    //         </div>
    //         <div className = 'info'>
    //             <span> Username: {username}</span>
    //         </div>
    //     </div> 
    //     <div>
    //             <button onClick={handleFollower}>Follow</button>
    //         </div>
    //     </div>