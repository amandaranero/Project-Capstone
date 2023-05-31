import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import Messages from "./Messages"



function MessageContainer(){
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  let {id} = useParams()

  useEffect(()=>{
      fetch(`/messages/${id}`)
      .then((resp)=>{
        if(resp.ok){
          resp.json()
          .then((messageData)=>{
            console.log(messageData)
            setMessages(messageData)
          })
        }
      })    
    },[])

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
                .then((messageData)=>{
                    setMessages([...messages, messageData])
                })
            }
        })
    }
    return(
      <div>
        <Messages messages={messages}/>
      <form onSubmit={handleSubmit}>
          <textarea
              className = "message"
              value = {message}
              onChange={(e)=> setMessage(e.target.value)}
              placeholder='Message'
          />
          <input type='submit'/>
          <button type='submit'>Send Message</button>
      </form>
  </div>
    )
}

export default MessageContainer