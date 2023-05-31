import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect} from 'react';
import { profileContext } from '../ProfileProvider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Events from './Events';
import Following from './Following'
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack';

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
    const {name, username, bio, following, events} = profile
  


      const followingList = following?.map((followed)=>(
        <Following key={followed.id} followed={followed}/>
      ))


    return(
        isAuthenticated && (
          <div style={{ padding: 35}}>
          <Box sx={{ flexGrow: 1}}>
              <Grid
                container  
                direction="row"
                justifyContent="center"
                spacing={{ xs: 0.5, md: 3}}
                columns={{ xs: 10, sm: 8, md: 12 }}
              >
              <Grid item xs={3} sm={4} md={4}>
                      Following
                        {followingList}
                  </Grid>
                <Grid item xs={7} sm={4} md={4}>
                  Upcoming Events
                  <Events/>
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                <Link to={'/userevents'}>
                    <Button variant="contained"  size ='large' sx={{ backgroundColor: "pink"  }}>
                      Your Events
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              </Box>
              </div>
       
          )
        );
      };
    

export default ProfilePage


            // {/* <Following followingList={followingList}/> */}
            // <h2>{name}</h2>
            // <div>
            // </div>
            //   <Link to = {'/userform'}>
            //       <Button variant="outlined">Edit Your Profile</Button>
            //    </Link>

            //   <Link to = {'/userevents'}>
            //       <Button variant="outlined">Your Events</Button>
            //   </Link>
            // {/* <img src={userimage} alt={name} /> */}
            // <h2>{bio}</h2>
            // <p>{username}</p>
            // <Link to={'/following'}>
            // <Button variant="outlined">Following</Button>
            // </Link>