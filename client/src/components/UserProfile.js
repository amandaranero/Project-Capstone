import User from "./User"
import { useEffect, useState, useContext } from "react";
import { followingContext } from "../FollowingProvider";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import MessageContainer from "./MessageContainer";
import ProfileEventCards from "./ProfileEventCards";



function UserProfile(){
    const [profileEvents, setProfileEvents] = useState([])
    const [following, setFollowing] = useContext(followingContext)
    const [follow, setFollow] = useState({})
    const [followButton, setFollowButton] = useState(true)
    console.log(following[1])

    let {id} = useParams()

    useEffect(()=>{
        if(following.some(user=>user.id==id)){
            setFollowButton(false)
        }
    })

    useEffect(()=>{
        fetch(`/profilevents/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((eventData)=>{
                    setProfileEvents(eventData)
                })
            }
        })

    },[id])

    const profileEventList = profileEvents?.map((event)=>(
        <ProfileEventCards key={event.id} event={event}/>
    ))

    const handleFollows = ()=>{
        if(followButton == true){
            handleFollower()
        }else{
            handleUnfollow()
        }
    }

    function handleFollower(){
        console.log("hello")
        fetch('/following', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            setFollowing([...following, follower])
            setFollow(follower)
            setFollowButton(false)
        })
    }

    function handleUnfollow(){
        fetch(`/following/${id}`,{
            method:'DELETE'
        }).then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followingData)=>{
                    setFollowing(followingData)
                    setFollowButton(true)
                })
            }
            
        })
    }


    return(
        <div>
            <Box sx={{ flexGrow: 1}}>
              <Grid
                container
                spacing={{ xs: 0.5, md: 3 }}
                columns={{ xs: 10, sm: 8, md: 12 }}
              >
              <Grid item xs={2} sm={4} md={4}>
                    <User/>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {/* <Button onClick={handleFollower}>Follow</Button>
                    <Button onClick={handleUnfollow}>UnFollow</Button> */}
                    <Button onClick={handleFollows}>{followButton ? "Follow" : "UnFollow"}</Button>
                    </Box>
                  </Grid>
                <Grid item xs={7} sm={4} md={4}>
                    {profileEventList}
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    {/* <Button variant="contained"  size ='large' sx={{ backgroundColor: "pink"  }}>
                      Your Events
                    </Button> */}
                </Grid>
              </Grid>
              </Box>
              <Grid
                    container
                    justifyContent="flex-start"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 8, sm: 8, md: 12 }}
                >
                
                    
                </Grid>
        </div>
    )
}

export default UserProfile

//MESSAGES FOR FUTURE
{/* <Grid  item xs={2} sm={4} md={4}>
{messageContainer ? <div> <MessageContainer/></div> :null }
</Grid> */}

{/* <IconButton onClick={handleMessage}>
<MessageIcon sx={{ height: 38, width: 38 }} />
</IconButton> */}

// const handleMessage = ()=>{
//     setMessageContainer(!messageContainer)
// }