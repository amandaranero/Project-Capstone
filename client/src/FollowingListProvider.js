import {createContext, useState} from 'react'

export const followingListContext = createContext()

const FollowingListProvider = ({children})=>{
    const [followingList, setFollowingList] = useState([])

    return(
        <followingListContext.Provider value = {[followingList, setFollowingList]}>
            {children}
        </followingListContext.Provider>
    )
}

export default FollowingListProvider