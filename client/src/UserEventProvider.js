import {createContext, useState, useEffect} from 'react'

export const userEventContext = createContext()


const UserEventProvider=({children})=>{
    const [userEvent, setUserEvent] = useState([])

    useEffect(()=>{
        fetch('/userevents')
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((eventData)=>{
                    setUserEvent(eventData)
                })
            }
        })
    },[])


    return(
        <div>
            <userEventContext.Provider value={[userEvent, setUserEvent]}>
                {children}
            </userEventContext.Provider>

        </div>
    )
}

export default UserEventProvider