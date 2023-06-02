import { useContext, useState } from 'react';
import { userEventContext } from '../UserEventProvider';
import {useParams, useNavigate} from 'react-router-dom'
import EventForm from './EventForm'
import EditEventForm from './EditEventForm';
import UserEventCard from './UserEventCard';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup } from '@mui/material';


function UserEvents(){
    const [userEvent, setUserEvent] = useContext(userEventContext)
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()

    const numOfEvents = userEvent.length

    let {id} = useParams()
    console.log(id)
    


  
    const userEventCards = userEvent?.map((event)=>(
        <UserEventCard key={event.id} event={event}/>
    ))

    const handleShowEvent = ()=>{
      setShowForm(!showForm)
    }






    return(
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{pt:4, pl:4}}>
          <Typography sx={{color:'black', fontSize:22}}>
            You have {numOfEvents} Upcoming Events!
          </Typography>
          </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 8, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Box sx={{pl:4}}>
          <Button variant='outlined' size='large' sx={{color:'#618833'}} onClick={handleShowEvent}> Add Event </Button>
          {showForm ? <EventForm/> : null}
          </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
          {userEventCards}
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          </Grid>
        </Grid>
      </Box>

    )
}

export default UserEvents




