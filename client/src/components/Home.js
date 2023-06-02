import { useAuth0 } from "@auth0/auth0-react";
import * as React from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



function Home(){
    const {user,isAuthenticated} = useAuth0();
    // render()
    const myStyle={
        backgroundImage: 
 "url(https://t3.ftcdn.net/jpg/02/87/35/70/360_F_287357045_Ib0oYOxhotdjOEHi0vkggpZTQCsz0r19.jpg)",
        height:'100vh',
        marginTop:'-70px',
        fontSize:'50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return(
            <div style={myStyle}>   
            <h1> partyhat</h1>
          </div>

    )
    
}


export default Home





