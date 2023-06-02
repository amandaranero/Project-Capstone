import User from "./User"
import Followers from "./Followers";
import Following from "./Following";
import { useEffect, useState, useContext } from "react";
import { followingContext } from "../FollowingProvider";
import { followingEventsContext } from "../FollowingEventsProvider"
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import ProfileEventCards from "./ProfileEventCards";




function UserProfile(){
    const [profileEvents, setProfileEvents] = useState([])
    const [following, setFollowing] = useContext(followingContext)
    const [follow, setFollow] = useState({})
    const [followButton, setFollowButton] = useState(true)
    const [userFollowers, setUserFollowers] = useState([])
    const [showFollowers, setShowFollowers] = useState(false)
    const [userFollowing, setUserFollowing] = useState([])
    const [showFollowing, setShowFollowing] = useState(false)
    const [followingEvents, setFollowingEvents] = useContext(followingEventsContext)
   

    let {id} = useParams()
    console.log(id)

    //USER'S FOLLOWERS
    useEffect(()=>{
        fetch(`/followers/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followerData)=>{
                    setUserFollowers(followerData)
                })
            }
        })
    }, [following])

    const followersList = userFollowers?.map((follow)=>(
        <Followers key ={follow.id} follow={follow}/>
    ))

    const handleShowFollowers = () =>{
        setShowFollowers(!showFollowers)
    }

    //USER FOLLOWING
    useEffect(()=>{
        fetch(`/following/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followingData)=>{
                    setUserFollowing(followingData)
                })
            }
        })
    },[])

    const followingList = userFollowing.map((followed)=>(
        <Following key={followed.id} followed={followed}/>
    ))

    const handleShowFollowing = () =>{
        setShowFollowing(!showFollowing)
    }


    //USER EVENTS DATA
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

    //FOLLOWING/UNFOLLOWING DATA
    //THIS IS SESSION USERS FOLLOWING
    useEffect(()=>{
        if(following.some(user=>user.id==id)){
            setFollowButton(false)
        }
    })

    const handleFollows = ()=>{
        if(followButton == true){
            handleFollower()
        }else{
            handleUnfollow()
        }
    }

    function handleFollower(){
        fetch('/following', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(id)
        }).then((resp)=> resp.json())
        .then((follower)=> {
            console.log(follower)
            setFollowing([...following, follower])
            setFollowingEvents(followingEvents.concat(profileEvents))
            setFollow(follower)
            setFollowButton(false)
        })
    }

    console.log(followingEvents)


    

    function handleUnfollow(){
        fetch(`/following/${id}`,{
            method:'DELETE'
        }).then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followingData)=>{
                    setFollowing(followingData)
                    setFollowButton(true)
                    setFollowingEvents((followingEvents)=>followingEvents.filter(event=>event.id !=id))
                })
            }
            
        })
    }

    console.log(followingEvents)

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
                    <Button onClick={handleFollows}>{followButton ? "Follow" : "UnFollow"}</Button>
                    </Box>
                  </Grid>
                <Grid item xs={7} sm={4} md={4}>
                    {profileEventList}
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    <Button variant='contained' onClick={handleShowFollowers}> Followers </Button>
                      {showFollowers ? followersList  : null } 
                    <Button variant='contained' onClick={handleShowFollowing}> Following </Button>
                      {showFollowing ? followingList : null } 
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