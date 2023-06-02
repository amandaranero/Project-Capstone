import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CommentContainer from './CommentContainer'
import Button  from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'

function CommentForm(){
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [comList, setComList] = useState([])
    // const {content} = comList
    let {id} = useParams()
    // console.log(id)

    console.log(comments)
    

    const commentsList = comments.map((c)=>(
        <CommentContainer key={c.id} c={c}/>
    ))


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


    //can change id based off card
    const new_comment={
        content: comment,
        event_id: id
    }

    const handleSubmit = (e)=>{
        console.log("click")
        e.preventDefault()
        fetch('/comments', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_comment)
        })
        .then((resp)=>{
            if (resp.ok){
                resp.json()
                .then((commentData)=>{
                    console.log(typeof commentData)
                    setComments([...comments, commentData])
                    setComment('')
                })
            }
        })

}

    return(
        <Card sx={{maxWidth: 340, height: 450}}>
        <Box 
            sx={{ mb: 2,
          display: "flex",
          flexDirection: "column",
          height: 375,
          overflow: "hidden",
          overflowY: "scroll"}}
          >
        {commentsList}
        <div>
            <h2>{comList.content}</h2>
            </div>
        </Box>
        <Box>
    <form onSubmit={handleSubmit}>
        <TextField
            variant = "outlined"
            sx={{
                color:'#932020',
                pb: 1,
            }}
            label='Add comment'
            type = "text"
            value = {comment}
            onChange={(e)=> setComment(e.target.value)}
            
        />
        <Button   sx={{color:'#932020', pt:2, fontSize:15}} type='submit'>Submit</Button>
    </form>
    </Box>
</Card>
    )
}

export default CommentForm
