import {useState} from 'react'
// this is going to be a form that will be on a post
// for stretch if time add emoji? is this possible? not sure...

function CommentForm({id}){
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    // const {id, name} = events


    //might not be able to useFormik because of the initial values?
    //post_id should not change


    //can change id based off card
    const new_comment={
        content: comment,
        event_id: id
    }

    const handleSubmit = (e)=>{
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
                    console.log(commentData)
                })
            }
        })

}

    return(
        <div>
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