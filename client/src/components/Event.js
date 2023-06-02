import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { likesContext } from '../LikesProvider';
import { likedEventsContext } from '../LikedEventsProvider';
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
import Box  from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


function Event(){
    const [eventInfo, setEventInfo] = useState([])
    const [eventIds] = useContext(likesContext)
    const [numLikes, setNumLikes] = useState([])
    const [likedEvents, setLikedEvents] = useContext(likedEventsContext)
    const [likeStatus, setLikeStatus] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const {description, username, event_name, userid, eventimage, userimage, date, time} = eventInfo
    const [commentForm, setCommentForm] = useState(false)

    let {id} = useParams()
    const numId = Number(id)
    const navigate = useNavigate()
    

    useEffect(()=>{
      if(eventIds.includes(numId)){
        setLikeStatus(false)
      }
    },[])

    useEffect(()=>{
      fetch(`/events/${id}`)
      .then((resp)=>{
          if (resp.ok){
              resp.json()
              .then((eventData)=>{
                  setEventInfo(eventData)
              })
          }
      })
  }, [id])

  

    const handleUser = ()=>{
      navigate(`/users/${id}`)
    }

    //returns id of all users for this event
    //bc users only like once then
    useEffect(()=>{
        fetch(`/likes/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((likeData)=>{
                    setNumLikes(likeData.length)
                })
            }
        })
    }, [id])

    // const handleUpdateLikedEvents = ()=>{
    //   console.log("click")
    //   if(likeStatus===false){
    //     console.log("hi")
    //     setLikedEvents((likedEvents)=>likedEvents.filter(event=>event.id !=id))
    //     console.log(likedEvents)
    //   }if(likeStatus=== true){
    //     setLikedEvents(likedEvents.concat(eventInfo))
    //   }
    // }

    //add a delete for when button is clicked
    //follow what i did for the following/followers

    const add_like = {
        event_id: id
    }
    const handleLike=()=>{
        fetch('/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(add_like)
        }).then((resp)=>{
            if (resp.ok){
                resp.json()
                .then((totalLikes)=>{
                    setNumLikes(totalLikes)
                    setLikeStatus(!likeStatus)
                    // handleUpdateLikedEvents()
                })
            }
        })
    }

    function handleComment(){
        setCommentForm(!commentForm)
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        <Grid item xs={2} md={4}>
        </Grid>
        <Grid item xs={4} md={4}>
          <Box sx={{pt:4}}>
        <Card sx={{ maxWidth: 400, height:500 }}>
          <Box sx={{ display:'flex'}}>
          <IconButton sx={{ p: 0, width: 80  }}>
                <Avatar src={userimage} sx={{ width: 55, height: 50}}/>
              </IconButton>
              <Box sx={{pt: 1}}>
                <Typography sx={{fontSize:14}}>
                  {username}
                </Typography>
              </Box>
              </Box>
            <CardContent>
            <Typography>
              Event Name: {event_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              date: {date} <h9> </h9>
              time: {time}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="250"
            image={eventimage}
            alt={event_name}
          />
          <Box sx={{pt:1, pb:0}}>
          <CardActions disableSpacing>
          <Typography>
          {numLikes}
          </Typography>
            <IconButton  onClick = {handleLike} 
                    variant="contained"
                    sx={{ bgcolor: likeStatus ? "null" : "#f06292" }}>
              <FavoriteBorderIcon/>
            </IconButton>
            <Button size="small" variant='contained' sx={{color:"#fb8c00"}} onClick ={handleComment}> Comments</Button>
          </CardActions>
          </Box>
          <CardContent>
            <Typography variant="body2" >
            {description}
            </Typography>
            </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
          </Collapse>
          </Card>
          </Box>
        </Grid>
        <Grid item xs={2} md={4}>
          <Box sx={{pt:6}}>
          {commentForm ? <CommentForm/> :null }
          </Box>
        </Grid>
        </Grid>
        </Box>
      );
}

export default Event
