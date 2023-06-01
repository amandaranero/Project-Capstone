import {useState, useEffect} from "react"
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

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));


function UserEventCard({event, handleShowEdit}){
    const {name, description, date, time, eventimages, id} = event
    console.log(eventimages)

    const navigate = useNavigate()



    function handleClick(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }

    const handleEdit=()=>{
      console.log("hi")
    }


    return (
      <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Box sx={{ flexGrow: 1, display: 'flex',
        justifyContent: 'center' }}> 
      <Card sx={{ width: 425, height: 400 }}>
          <CardActionArea>
          <Button onClick={handleShowEdit}>Edit</Button>
            <CardMedia
              component="img"
              height="250"
              image={eventimages ? eventimages[0].url : null}
              alt={name}
              onClick={handleClick}
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
      );
    }

export default UserEventCard