import {createContext, useState, useEffect} from 'react'

export const followingContext = createContext()

const FollowingProvider= ({children})=>{
    const [following, setFollowing] = useState([])

    useEffect(()=>{
        fetch('/following')
        .then((resp)=>{
            if(resp.ok){
                resp.json()
                .then((followingData)=>{
                    setFollowing(followingData)
                })
            }
        })
    }, [])

    return(
        <div>

            <followingContext.Provider value={[following, setFollowing]}>
                {children}
            </followingContext.Provider>

        </div>
    )
}

export default FollowingProvider