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


    const images = userimages?.map((image)=>{
            return image
    })
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate(`/users/${id}`)
        return <User user={user} />
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
