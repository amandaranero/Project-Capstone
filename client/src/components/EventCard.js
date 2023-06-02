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



function EventCard({event}){
    const {name, description, date, time, eventimages, id} = event

    const navigate = useNavigate()




    function handleClick(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }


    return (
      <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Box sx={{ flexGrow: 1, display: 'flex',
        justifyContent: 'center', boxShadow:'none' }}> 
      <Card sx={{ width: 425, height: 420 }}>
          <CardActionArea>
            <Box sx={{pt:2}}>
          <Typography gutterBottom variant="h6" component="div">
                {name}
              </Typography>
              </Box>
              <Box sx={{pt:0}}>
              <Typography gutterBottom variant="h8" component="div">
                Date: {date} ,  Time: {time}
              </Typography>
              </Box>
            <CardMedia
              component="img"
              height="350"
              image={eventimages ? eventimages[0].url : ""}
              alt={name}
              onClick={handleClick}
              sx={{objectFit: 'contain'}}
            />
            <CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
</Box>
<h3>   </h3>
</div>
      );
    }

export default EventCard




{/* <Box sx={{ flexGrow: 1 }}>
<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {Array.from(Array(6)).map((_, index) => (
    <Grid xs={2} sm={4} key={index}>
      <Item>
      <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg"
              alt={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={handleClick}>
              More Info
            </Button>
          </CardActions>
        </Card>
      </Item>
    </Grid>
  ))}
</Grid>
</Box> */}