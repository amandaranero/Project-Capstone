import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import * as React from 'react';
import Button from '@mui/material/Button';


function NavBar(){
    const {isAuthenticated} = useAuth0()
    
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
                <div className="block"> 
                <Link to ={'/'}>
                <Button variant="outlined">Home</Button>
                </Link>
                <Link to ={'/profile'}>
                <Button variant="outlined">Your Profile</Button>
                </Link>
                <Link to ={'/events'}>
                <Button variant="outlined">Explore Events</Button>
                </Link>
               <LogoutButton/>
               </div>
            </div>
            </header>
        ) 
    }
}

export default NavBar