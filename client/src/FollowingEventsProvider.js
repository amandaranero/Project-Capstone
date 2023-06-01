import {createContext, useState, useEffect} from 'react'

export const followingEventsContext = createContext()

const FollowingEventsProvider = ({children})=>{
    const [followingEvents, setFollowingEvents] = useState([])

    useEffect(()=>{
      fetch('/followingevents')
      .then((resp)=>{
        if(resp.ok){
          resp.json()
          .then((followev)=>{
            setFollowingEvents(followev)
          })
        }
      })
    },[])

    return(
        <div>

            <followingEventsContext.Provider value={[followingEvents, setFollowingEvents]}>
                {children}
            </followingEventsContext.Provider>


        </div>
    )
}

export default FollowingEventsProvider


