import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';




function User(){
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState({})
    const [messages, setMessages] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const {bio, email, name, userimages, username} = userProfile
    const theme = useTheme();
    
    let {id} = useParams()

    useEffect(()=>{
        fetch(`/users/${id}`)
        .then((resp)=> resp.json())
        .then((user)=> setUserProfile(user))
    }, [id])


    
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
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {username}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={userimages ?  userimages[0].url : null} 
        alt={`${name}’s photo`}
      />
    </Card>

    </div>

    )
}

export default User

