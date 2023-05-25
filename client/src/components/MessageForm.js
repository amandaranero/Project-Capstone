import { useState } from "react"


function MessageForm({id}){
    const [message, setMessage] = useState('')

    // console.log(id)

    const new_message={
        content: message,
        reciever_id: id
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/messages',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(new_message)
        } ).then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((messageContent)=>{
                    console.log(messageContent)
                })
            }
        })

    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className = "message"
                    value = {message}
                    onChange={(e)=> setMessage(e.target.value)}
                    placeholder='Message'
                />
                <button type='submit'>Send Message</button>
            </form>
        </div>
    )
}

export default MessageForm