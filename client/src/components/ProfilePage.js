import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext} from 'react';
import { profileContext } from '../ProfileProvider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfileBar from './ProfileBar';
import Events from './Events';


function ProfilePage(){
    const {isAuthenticated} = useAuth0();
    const [profile, setProfile] = useContext(profileContext)
    const {name, username, bio, userimage, following, events} = profile

    console.log(following)


  //FETCH PROFILE INFO AND SET TO USECONTEXT STATE, PERHAPS WILL HOLD SPEC FOLLOWING BETTER
  useEffect(()=>{
      fetch('/profile')
      .then((resp)=>{
        if(resp.ok){
          resp.json()
          .then((profData)=>{
            setProfile(profData)
          })
        }
      })
    },[])


    return(
        isAuthenticated && (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div className='grid-elements'>
                  <ProfileBar name={name} username={username} userimage={userimage}/>
                </div>
              </Grid>
            </Grid>
            Should be the following events
            <Events/>
          </Box>
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