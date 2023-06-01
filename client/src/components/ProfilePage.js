import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState} from 'react';
import { profileContext } from '../ProfileProvider';
import { likedEventsContext } from "../LikedEventsProvider"
import { followingEventsContext } from "../FollowingEventsProvider"
import { followingContext } from '../FollowingProvider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Following from './Following'
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material'
import LikedEvents from './LikedEvents';
import FollowingEvents from './FollowingEvents';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));


function ProfilePage(){
    const {isAuthenticated} = useAuth0();
    const [profile] = useContext(profileContext)
    const {name, username, bio} = profile
    const [following] = useContext(followingContext)
    const [likedEvents] = useContext(likedEventsContext)
    const [followingEvents] = useContext(followingEventsContext)
    const [openEvents, setOpenEvents] = useState(true)
    
  
      const followingList = following?.map((followed)=>(
        <Following key={followed.id} followed={followed}/>
      ))
      
      const likedEventList = likedEvents?.map((e)=>(
        <LikedEvents key={e.id} e={e}/>
      ))

      const followingEventsList = followingEvents?.map((followevent)=>(
        <FollowingEvents key={followevent.id} followevent={followevent}/>
      ))

      function handleEvents(){
        setOpenEvents(!openEvents)
      }



    return(
        isAuthenticated && (
          <div style={{ width:'100%'}}>
          <Box sx={{ flexGrow: 1}}>
              <Grid
                container  
                direction="row"
                justifyContent="center"
                spacing={5}
                columns={{ xs: 10, sm: 8, md: 12 }}
              >
              <Grid item xs={3} sm={4} md={4}>
                      Following
                        {followingList}
                  </Grid>
                <Grid item xs={7} sm={4} md={4}>
                  {followingEventsList}
                </Grid>
                <Grid item xs={3} sm={4} md={4} justifyContent="flext-start">
                <Link to={'/userevents'}>
                    <Button variant="contained"  size ='large' sx={{ backgroundColor: "pink"  }}>
                      Your Events
                    </Button>
                  </Link>
                  <h1>       </h1>
                  <h1>       </h1>
                  <div>
                    <Button variant="contained" size ='large' sx={{ backgroundColor: "pink"  }} onClick={handleEvents}>
                      {openEvents ? "Liked Events" : "Close Events"}
                    </Button>
                  </div>
                  <Grid container
                      direction="row"
                      justifyContent="flext-start"
                      alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              <Grid item xs={2} sm={4} md={4} >
                              {openEvents ? null : likedEventList}
                              </Grid>
                    </Grid>
                </Grid> 
              </Grid>
              </Box>
              </div>
       
          )
        );
      };
    

export default ProfilePage

