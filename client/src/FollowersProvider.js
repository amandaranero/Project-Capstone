import {createContext, useState, useEffect, useContext} from 'react'

export const followerContext = createContext()

const FollowerProvider= ({children})=>{
    const [followers, setFollowers] = useState([])

    useEffect(()=>{
        fetch('/followers')
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followerData)=>{
                    setFollowers(followerData)
                })
            }
        })
    }, [])

    return(
        <div>

            <followerContext.Provider value={[followers, setFollowers]}>
                {children}
            </followerContext.Provider>

        </div>
    )
}

export default FollowerProvider