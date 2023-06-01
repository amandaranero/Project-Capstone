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
import ListItemText from '@mui/material/ListItemText';

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
        <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Box sx={{ flexGrow: 1, display: 'flex',
        justifyContent: 'center' }}> 
      <Card sx={{ width: 425, height: 400 }}>
          <CardActionArea>
          <ListItemIcon onClick={handleUser}>
            <Avatar alt={name} src={userimage ? userimage[0] : null} />
          </ListItemIcon>
          <ListItemText primary={username} primaryTypographyProps={{fontSize: '13px'}}/>
            <CardMedia
              component="img"
              height="250"
              image={image ? image[0] : null}
              alt={name}
              onClick={handleEvent}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {name}
              </Typography>
              <Typography gutterBottom variant="h8" component="div">
                {date}, {time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
</Box>
<h3>   </h3>
</div>
    )
}

export default FollowingEvents