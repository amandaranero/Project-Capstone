import {createContext, useState} from 'react'


export const followingContext = createContext()


const FollowingProvider = ({children})=>{

    const [following , setFollowing] = useState([])


    return(

        <followingContext.Provider value={[following, setFollowing]}>
            {children}
        </followingContext.Provider>
    )
}


export default FollowingProvider