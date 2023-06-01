import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import ProfileBar from "./ProfileBar";
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";


function NavBar(){
    const {user, isAuthenticated} = useAuth0()
    
    if (!isAuthenticated){
        return(
            <div>
                <LoginButton/>     
            </div>
        )
    }else{
        return(
            <header className="bg-gray-100 p-6">
            <div className="flex items-center justify-between flex-wrap">
                                        <Grid container spacing={3}>
              <Grid item xs={4}>
                <div className='grid-elements'>
                  <ProfileBar/>
                </div>
              </Grid>
              </Grid>
                <div className="block"> 
                <Link to ={'/'}>
                <Button variant="outlined">Home</Button>
                </Link>
                <Link to ={'/events'}>
                <Button variant="outlined">Explore Events</Button>
                </Link>
                <Link to ={'/profile'}>
                <Button variant="outlined">Your Profile</Button>
                </Link>
               <LogoutButton/>
               </div>
            </div>
            </header>
        ) 
    }
}

export default NavBar