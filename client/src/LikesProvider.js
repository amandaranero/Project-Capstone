import {createContext, useState, useEffect} from 'react'

export const likesContext = createContext()


const LikesProvider = ({children})=>{
    const [eventIds, setEventIds] = useState([])


    //returns the event ids for the session user
    //will check to see if the event id for 
    //the shown event is in the session ysers event
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

    return(
        <div>
        <likesContext.Provider value={[eventIds, setEventIds]}>
            {children}
        </likesContext.Provider>

    </div>
    )
}

export default LikesProvider

