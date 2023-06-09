import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';



function Following({followed}) {
  const {name, username, userimages, id} = followed
  const navigate =  useNavigate()

  const handleUser = ()=>{
    navigate(`/users/${id}`)
  }

  return (
      <List
      sx={{ width: '100', maxWidth: 400, bgcolor: 'background.paper', alignItems:'center'}}
      aria-label="contacts"
    >
      <ListItem disablePadding >
        <ListItemButton onClick={handleUser}  >
          <ListItemIcon >
            <Avatar alt={name} src={userimages ? userimages[0].url : null} />
          </ListItemIcon>
          <ListItemText primary={name} primaryTypographyProps={{fontSize: '13px'}}/>
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default Following