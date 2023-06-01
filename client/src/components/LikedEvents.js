import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { likedEventsContext } from '../LikedEventsProvider';

function LikedEvents({e}){
    const [likedEvents] = useContext(likedEventsContext)
    console.log(likedEvents)
    const {name, user_id, date, time, event, eventimages} = e

    

    return(
        
        <div style={{ width: '100%' }}>
        <h3>  </h3>
        <Card sx={{ display: 'flex' , width:400 , height:200 }}>
        <CardContent sx={{ height: 150, width:200}}>
        <Typography component="div" variant="h9">
          {name}
        </Typography>
        <Typography variant="h10" color="text.secondary" component="div">
          Host: {event.name}
        </Typography>
      </CardContent>
      <CardContent>
        <CardMedia
      component="img"
      sx={{ width: 250 , height:100}}
      image={eventimages ? eventimages[0].url : null}
      alt={name}
    />
    <Typography variant="h10">
        date: {date}
        time: {time}
    </Typography>
    </CardContent>
  </Card>
 </div>
);
}

export default LikedEvents