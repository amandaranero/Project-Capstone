import {useState, useContext} from 'react'
import {useNavigate, Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { profileContext } from '../ProfileProvider';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


const pages = ['Your Profile', 'Explore Events'];
const settings = ['Edit Profile'];



function ProfileBar() {
  const {isAuthenticated} = useAuth0()
  const [profile] = useContext(profileContext)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {name, username, userimage} = profile


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  if(!isAuthenticated){
    return(
      <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Box boxShadow={0} sx={{justifyContent: 'flex-start', display:'flex', }}>
        < CelebrationIcon sx={{fontSize:60, color: '#ec407a'}}/> 
        <LoginButton/>   
                <Link to ={'/events'}>
                    <Button variant="contained" sx={{ backgroundColor: '#fff9e7' , width: 200, padding: 1, margin: 2, boxShadow: 0   }}>Explore Events</Button>
                </Link> 
                </Box>
      </Container>
    </AppBar>
    )
  }
  return (
    <AppBar position="static">
      <Container maxWidth="l" boxShadow={0} >
          <Box boxShadow={0} sx={{justifyContent: 'flex-start', display:'flex' }}>
                  <Box sx={{justifyContent: 'flex-start', display:'flex'}}>
          < CelebrationIcon sx={{fontSize:60, color: '#ec407a' }}/> 
          </Box>
          <Link to ={'/'}>
                <Button variant="contained" sx={{ backgroundColor: '#fff9e7', width: 200, padding: 1, margin: 2, boxShadow: 0  }}>Home</Button>
          </Link>
          <Link to ={'/profile'}>
                <Button variant="contained" sx={{ backgroundColor: '#fff9e7' ,  width: 200, padding: 1, margin: 2, boxShadow: 0  }}>Your Profile</Button>
          </Link>
          <Link to ={'/events'}>
                <Button variant="contained" sx={{ backgroundColor: '#fff9e7' ,  width: 200, padding: 1, margin: 2, boxShadow: 0   }}>Explore Events</Button>
          </Link>
        <LogoutButton/>
        </Box>
      </Container>
    </AppBar>
  );
}
export default ProfileBar;

