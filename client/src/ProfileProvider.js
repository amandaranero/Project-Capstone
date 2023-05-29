import {createContext, useState} from 'react'

export const profileContext = createContext()



const ProfileProvider = ({children})=>{
    const [profile, setProfile] = useState([])

    return(

        <profileContext.Provider value={[profile, setProfile] }>
           {children}
        </profileContext.Provider>

    )
}

export default ProfileProvider