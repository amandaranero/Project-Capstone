import User from "./User"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import MessageContainer from "./MessageContainer";
import ProfileEventCards from "./ProfileEventCards";



function UserProfile(){
    const [messageContainer, setMessageContainer] = useState(false)
    const [profileEvents, setProfileEvents] = useState([])

    let {id} = useParams()

    useEffect(()=>{
        fetch(`/profilevents/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((eventData)=>{
                    setProfileEvents(eventData)
                })
            }
        })

    },[id])

    const profileEventList = profileEvents?.map((event)=>(
        <ProfileEventCards key={event.id} event={event}/>
    ))

    const handleMessage = ()=>{
        setMessageContainer(!messageContainer)
    }




    return(
        <div>
            <Box sx={{ flexGrow: 1}}>
              <Grid
                container
                spacing={{ xs: 0.5, md: 3 }}
                columns={{ xs: 10, sm: 8, md: 12 }}
              >
              <Grid item xs={2} sm={4} md={4}>
                    <User/>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton onClick={handleMessage}>
                            <MessageIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </Box>
                  </Grid>
                <Grid item xs={7} sm={4} md={4}>
                    {profileEventList}
                </Grid>
                <Grid item xs={2} sm={4} md={4}>
                    {/* <Button variant="contained"  size ='large' sx={{ backgroundColor: "pink"  }}>
                      Your Events
                    </Button> */}
                </Grid>
              </Grid>
              </Box>
              <Grid
                    container
                    justifyContent="flex-start"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 8, sm: 8, md: 12 }}
                >
                    <Grid  item xs={2} sm={4} md={4}>
                    {messageContainer ? <div> <MessageContainer/></div> :null }
                    </Grid>
                </Grid>
        </div>
    )
}

export default UserProfile