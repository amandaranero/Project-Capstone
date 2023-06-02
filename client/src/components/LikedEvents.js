import { useTheme } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { likedEventsContext } from '../LikedEventsProvider';

function LikedEvents({e}){
    const [likedEvents] = useContext(likedEventsContext)
    console.log(likedEvents)
    const {name, user_id, date, time, event, eventimages, description, id} = e
    console.log(e)

    

    return(
        
        <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Card sx={{ display: 'flex' , width:400 , height:200 }}>
        <CardContent sx={{ height: 150, width:200}}>
        <Typography component="div" variant="h9" sx={{fontSize:19}}>
          Event: {name}
        </Typography>
        <Box sx={{pt:3}}>
        <Typography variant="h10" sx={{fontSize:15}} color="text.secondary" component="div">
          Host: {event.name}
        </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Link to={`/events/${id}`}>
        <CardMedia
      component="img"
      sx={{ width: 250 , height:100}}
      image={eventimages ? eventimages[0].url : null}
      alt={name}
    />
    </Link>
    <Typography sx={{fontSize:16}}>
      <Box sx={{pt:1}}>date: {date}</Box>  
      <Box>time: {time}</Box>  
    </Typography>
    </CardContent>
  </Card>
 </div>
);
}

export default LikedEvents