import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CommentContainer from './CommentContainer'


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
        console.log("hi")
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
                })
            }
        })

}

    return(
        <div>
            {commentsList}
            <div>
                <h2>{comList.content}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className = "comment"
                    value = {comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder='Add comment'
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CommentForm