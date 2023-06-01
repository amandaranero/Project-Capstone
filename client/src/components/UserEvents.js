import { useContext, useState } from 'react';
import { userEventContext } from '../UserEventProvider';
import {useParams, useNavigate} from 'react-router-dom'
import EventForm from './EventForm'
import EditEventForm from './EditEventForm';
import UserEventCard from './UserEventCard';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, ButtonGroup } from '@mui/material';


function UserEvents(){
    const [userEvent, setUserEvent] = useContext(userEventContext)
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()

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
          {/* {showEditForm ? <EditEventForm/> : null} */}
          </Grid>
        </Grid>
      </Box>

    )
}

export default UserEvents

//confirm delete button
//TOO SIDE TRACKED ADD LATER IF TIME
//BUTTONS AND TERNARY
// {confirmDelete ? 
//   <Box
//   sx={{
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     '& > *': {
//       m: 1,
//     },
//   }}
// >
//   Are you sure you want to Delete this event?
// <ButtonGroup size="large" aria-label="large button group" onClick={handleResponse}>
//   {buttons}
// </ButtonGroup>
// </Box>
// : null}

//STATE:
// const [confirmDelete, setConfirmDelete] = useState(false)



