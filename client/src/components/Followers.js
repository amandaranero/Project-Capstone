import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


function Followers({follow}){
    const {name, username, userimages, id} = follow
    const navigate =  useNavigate()

    const handleUser = ()=>{
        navigate(`/users/${id}`)
    }

    return(
        <List
        sx={{ width: '60%', maxWidth: 300, bgcolor: 'background.paper' }}
        aria-label="contacts"
      >
        <ListItem disablePadding >
          <ListItemButton onClick={handleUser}>
            <ListItemIcon>
              <Avatar alt={name} src={userimages ? userimages[0].url : null} sx={{ width: 56, height: 56 }}/>
            </ListItemIcon>
            <ListItemText primary={name} primaryTypographyProps={{fontSize: '15px'}}/>
          </ListItemButton>
        </ListItem>
      </List>
    )
}

export default Followers