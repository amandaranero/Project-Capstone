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
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/base';

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

  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };  

    const handleUser = ()=>{
      navigate(`/users/${userid}`)
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
                    //setEventLikedtotheEvent..might need to send it back tho
                })
            }
        })
    }

    function handleComment(){
        setCommentForm(!commentForm)
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={userimage} 
                    onClick={handleUser}>
                
              </Avatar>
            }
            
            // title={event}
            //need to put date and time in here
          />
          {username}
          <CardMedia
            component="img"
            height="194"
            image={eventimage}
            alt={event_name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {event_name}
              {description}
              {date}
              {time}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick = {handleLike}>
            {numLikes}
              <FavoriteIcon /> 
              {likeStatus ? 'Like' : 'Unlike'} 
            </IconButton>
            <Button variant="outlined" onClick ={handleComment}> Add Comment</Button>
            See comments
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
            </CardContent>
          </Collapse>
          <div>
          {commentForm ? <div> <CommentForm/></div> :null }
          </div>
        </Card>
      );
}

export default Event

// return(
    //     <div>
    //         <h2>{name}</h2>
    //         <div>
    //     <div className = 'card'>
    //             {/* <img className='img' src={eventImages[0] ? eventImages[0].url : null} alt={`${name}’s photo`} /> */}
    //         <div className = "title">
    //             {name}
    //         </div>
    //         <div className = 'info'>
    //             <span> {description}</span>
    //         </div>
    //     </div> 
    //     <div>
    //         <Button variant="outlined" onClick = {handleLike}>{likeStatus ? 'Like' : 'Unlike'}</Button>
    //         {numLikes}
    //     </div>
    //     <Button variant="outlined" onClick ={handleComment}> Add Comment</Button>
    //     <CommentForm id={id}/>
    //     <div>
    //         {comments}
    //     </div>
    //     </div>
    //     </div>
    // )