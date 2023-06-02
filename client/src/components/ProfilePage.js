import {Link, useParams, useNavigate} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState, useEffect} from 'react';
import { profileContext } from '../ProfileProvider';
import { likedEventsContext } from "../LikedEventsProvider"
import { followingEventsContext } from "../FollowingEventsProvider"
import { followingContext } from '../FollowingProvider';
import { followerContext } from '../FollowersProvider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Following from './Following'
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button } from '@mui/material'
import LikedEvents from './LikedEvents';
import FollowingEvents from './FollowingEvents';
import Followers from './Followers';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

const settings = ['Edit Profile'];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 100,
  lineHeight: '60px',
}))

const lightTheme = createTheme({ palette: { mode: 'light' } });


function ProfilePage(){
    const {isAuthenticated, user} = useAuth0();
    const [profile] = useContext(profileContext)
    const [following] = useContext(followingContext)
    const [followers] = useContext(followerContext)
    const [likedEvents] = useContext(likedEventsContext)
    const [followingEvents] = useContext(followingEventsContext)
    const [openEvents, setOpenEvents] = useState(true)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };

      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      const handleEditProfile = ()=>{
        navigate('/userform')
      }
    

      const {name, userimage, username, bio} = profile

      console.log(profile)
      const followerList = followers.map((follow)=>(
        <Followers key={follow.id} follow={follow}/>
      ))
  
      const followingList = following?.map((followed)=>(
        <Following key={followed.id} followed={followed}/>
      ))
      
      const likedEventList = likedEvents?.map((e)=>(
        <LikedEvents key={e.id} e={e}/>
      ))

      const followingEventsList = followingEvents?.map((followevent)=>(
        <FollowingEvents key={followevent.id} followevent={followevent}/>
      ))

      function handleEvents(){
        setOpenEvents(!openEvents)
      }



    return(
        isAuthenticated && (
          <div style={{ width:'100%'}}>
          <Box sx={{ flexGrow: 1}}>
              <Grid
                container  
                direction="row"
                justifyContent="center"
                spacing={5}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
              <Grid item xs={4} sm={4} md={4}>
          <Grid item xs={12} >
                    <ThemeProvider theme={lightTheme}>
                        <Box
                        sx={{
                            p: 2,
                            bgcolor: 'background.default',
                            display: 'grid',
                            gap: 2,
                            height: 150
                        }}
                        > 
                            <Item  elevation={2} alignItems='center'>
                            <Toolbar>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, width: 70, margin: 2  }}>
                <Avatar alt={name} src={userimage} sx={{ width: 56, height: 56}}/>
              {name}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleEditProfile}>
                  <Typography textAlign="center">{settings}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Toolbar>
            </Item>
              </Box>
            </ThemeProvider>
        </Grid>
                      <Box justifyContent="center">
                        Following
                        {followingList}
                        </Box>
                       Followers
                        {followerList}
                  </Grid>
                <Grid item xs={6} sm={4} md={4}>
                  {followingEventsList}
                </Grid>
                <Grid item xs={4} sm={4} md={4} justifyContent="flext-start">
                  <Box sx={{ paddingTop: 2 }}>
                <Link to={'/userevents'}>
                    <Button variant="contained"  size ='large' sx={{ backgroundColor: "pink"  }}>
                      Your Events
                    </Button>
                  </Link>
                  </Box>
                  <Box sx={{ paddingTop: 2 }}>
                    <Button variant="contained" size ='large' sx={{ backgroundColor: "pink"  }} onClick={handleEvents}>
                      {openEvents ? "Liked Events" : "Close Events"}
                    </Button>
                    </Box>
                  <Grid container
                      direction="row"
                      justifyContent="flext-start"
                      alignItems="center" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              <Grid item xs={2} sm={4} md={4} >
                              {openEvents ? null : likedEventList}
                              </Grid>
                    </Grid>
                </Grid> 
              </Grid>
              </Box>
              </div>
       
          )
        );
      };
    

export default ProfilePage

