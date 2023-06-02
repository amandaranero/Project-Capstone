import { useContext } from "react"
import {Link, Navigate, useNavigate} from 'react-router-dom'
import CommentForm from './CommentForm'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import { PropTypes } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

function FollowingEvents({followevent}){
    const {name, description, id, date, time, image, userimage, username, user_id} = followevent

    const navigate = useNavigate()

    function handleEvent(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }

    function handleUser(){
      navigate(`/users/${user_id}`)
    }
  
 

    return(
      <Box sx={{ flexGrow: 1 ,  display: 'flex',
      justifyContent: 'center' }}>
      <Grid container spacing={1}>
      <Grid item xs={4} md={4}>
        <Box sx={{pt:4}}>
      <Card sx={{ width: 425, height: 400 }}>
        <Box sx={{ display:'flex'}}>
        <IconButton onClick={handleUser} sx={{ p: 0, width: 80  }}>
              <Avatar src={userimage} sx={{ width: 50, height: 40}}/>
            </IconButton>
            <Box sx={{pt: 1}}>
              <Typography sx={{fontSize:14}}>
                {username}
              </Typography>
            </Box>
            </Box>
          <CardContent>
          <Typography>
            Event Name: {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            date: {date} <h9> </h9>
            time: {time}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={name}
        />
         <CardContent>
            <Typography variant="body2" >
            {description}
            </Typography>
            </CardContent>
          </Card>
          </Box>
        </Grid>
        </Grid>
        </Box>
    )
}

export default FollowingEvents