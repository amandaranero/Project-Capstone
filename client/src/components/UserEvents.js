import { useContext, useState } from 'react';
import { userEventContext } from '../UserEventProvider';
import EventForm from './EventForm'
import EditEventForm from './EditEventForm';
import UserEventCard from './UserEventCard';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from '@mui/material';


function UserEvents(){
    const [userEvent, setUserEvent] = useContext(userEventContext)
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    const handleShowEdit = ()=>{
      setShowEditForm(!showEditForm)
    }

    const userEventCards = userEvent?.map((event)=>(
        <UserEventCard key={event.id} event={event} handleShowEdit={handleShowEdit}/>
    ))

    const handleShowEvent = ()=>{
      setShowForm(!showForm)
    }



    return(
        <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 8, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
          <Button onClick={handleShowEvent}> Add Event </Button>
          {showForm ? <EventForm/> : null}
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
          {userEventCards}
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
          {showEditForm ? <EditEventForm/> : null}
          </Grid>
        </Grid>
      </Box>

    )
}

export default UserEvents


