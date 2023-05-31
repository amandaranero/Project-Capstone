import {createContext, useState, useEffect} from 'react'

export const eventsContext = createContext()

const EventsProvider = ({children})=>{
    const [events, setEvents] = useState([])

  useEffect(()=>{
    fetch('/events')
    .then((resp)=>{
      if (resp.ok){
        resp.json()
        .then((eventData)=>{
          setEvents(eventData)
        })
      }
    })
  }, [])

    return(

        <eventsContext.Provider value={[events, setEvents]}>
            {children}
        </eventsContext.Provider>

    )
}

export default EventsProvider