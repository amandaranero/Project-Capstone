import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import '../componentcss/UserCard.css'

function Event(){
    const [event, setEvent] = useState([])
    // const [userLikes, setUserLikes] = useState([])
    const [eventIds, setEventIds] = useState([])
    const [comments, setComments] = useState([])
    const [numLikes, setNumLikes] = useState([])
    const [likeStatus, setLikeStatus] = useState(true)
    const [loading, setLoading] = useState(false)


    const {name, description, user_id} = event


    let {id} = useParams()
    const numId = Number(id)

    useEffect(()=>{
        fetch('/likes')
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((data)=>{
                    setEventIds(data)
                    setLoading(!loading)
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
        //will open comment and all comments
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
    }, [id])

    return(
        <div>
            <h2>{name}</h2>
            <div>
        <div className = 'card'>
                {/* <img className='img' src={eventImages[0] ? eventImages[0].url : null} alt={`${name}’s photo`} /> */}
            <div className = "title">
                {name}
            </div>
            <div className = 'info'>
                <span> {description}</span>
            </div>
        </div> 
        <div>
            <button onClick = {handleLike}>{likeStatus ? 'Like' : 'Unlike'}</button>
            {numLikes}
        </div>
        <button onClick ={handleComment}> Add Comment</button>
        <CommentForm id={id}/>
        <div>
            {comments}
        </div>
        </div>
        </div>
    )
}

export default Event