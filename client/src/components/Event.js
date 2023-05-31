import { useEffect, useState } from 'react'
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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    const [event, setEvent] = useState([])
    // const [userLikes, setUserLikes] = useState([])
    const [eventIds, setEventIds] = useState([])
    const [comments, setComments] = useState([])
    const [numLikes, setNumLikes] = useState([])
    const [likeStatus, setLikeStatus] = useState(true)
    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = useState(false);
    const {name, description, date, time} = event

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


    let {id} = useParams()
    const numId = Number(id)
    useEffect(()=>{
        fetch('/likes')
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((data)=>{
                    setEventIds(data)
                })
            }
        })
    }, [])

    // getting weird glitch on refresh page, ugh
    useEffect(()=>{
        if(loading){
            if (eventIds.includes(numId)){
                setLikeStatus(false)
            }
        }
    })    

    //returns id of users
    //bc users only like once then
    useEffect(()=>{
        fetch(`/likes/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((likeData)=>{
                    // setUserLikes(likeData)
                    setNumLikes(likeData.length)
                })
            }
        })
    }, [id])

    

    useEffect(()=>{
        fetch(`/events/${id}`)
        .then((resp)=>{
            if (resp.ok){
                resp.json()
                .then((eventData)=>{
                    setEvent(eventData)
                })
            }
        })
    }, [id])


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
                })
            }
        })
    }

    function handleComment(){
        <CommentForm id={id}/>
        console.log("open")
    }

    useEffect(()=>{
        fetch(`/comments/${id}`)
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((commentData)=>{
                    setComments(commentData)
                })
            }
        })
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {name}
              </Avatar>
            }
            title={name}
            //need to put date and time in here
          />
          <CardMedia
            component="img"
            height="194"
            image="https://media.npr.org/assets/img/2022/11/04/gettyimages-1183414292-1-_slide-edff8c3fe6afcab5c6457e3c7bd011f5c1745161-s1100-c50.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
                {description}
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
                {comments}
            </CardContent>
          </Collapse>
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