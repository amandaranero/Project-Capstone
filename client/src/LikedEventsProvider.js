import {createContext, useState, useEffect} from 'react'

export const likedEventsContext = createContext()

const LikedEventsProvider=({children})=>{
    const [likedEvents, setLikedEvents] = useState([])


    useEffect(()=>{
        fetch('/likevents')
        .then((resp)=>{
          if(resp.ok){
            resp.json()
            .then((eventData)=>{
              setLikedEvents(eventData)
            })
          }
        })
      },[])

    return(
        <div>

            <likedEventsContext.Provider  value={[likedEvents, setLikedEvents]}>
                {children}
            </likedEventsContext.Provider>

        </div>
    )


}

export default LikedEventsProvider

