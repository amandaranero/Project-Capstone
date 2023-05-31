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



function ProfileEventCards({event}){
    const {name, description, date, time, eventimage, id} = event
    // const [eventImages, setEventImages] = useState([])

    const navigate = useNavigate()

    // useEffect(()=>{
    //     const images = eventimages?.map((image)=>{
    //         return image
    //     })
    //     setEventImages(images)
    // }, [])

    // console.log(eventImages)


    function handleClick(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }

    return(
        <div>
        <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Box sx={{ flexGrow: 1, display: 'flex',
        justifyContent: 'center' }}> 
      <Card sx={{ width: 425, height: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image={"https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg"}
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

        </div>
    )
}

export default ProfileEventCards