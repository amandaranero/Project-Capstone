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


function EventCard({event}){
    const {name, description, date, time, event_type, eventimages, id} = event
    const [eventImages, setEventImages] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const images = eventimages.map((image)=>{
            return image
        })
        setEventImages(images)
    }, [])


    function handleClick(){
        navigate(`/events/${id}`)
        return <CommentForm id={id}/>
    }


    return (
      <div style={{ width: '100%' }}>
<Box sx={{ flexGrow: 1, display: 'flex',
          justifyContent: 'center' }}>
<Grid container  spacing={0} columns={0}>
    <Grid xs={2} sm={4}>
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
</Grid>
</Box>
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