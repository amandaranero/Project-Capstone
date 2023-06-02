import {createContext, useState, useEffect} from 'react'

export const profileContext = createContext()



const ProfileProvider = ({children})=>{
    const [profile, setProfile] = useState([])

    useEffect(()=>{
      fetch('/profile')
      .then((resp)=>{
        if(resp.ok){
          resp.json()
          .then((profData)=>{
            setProfile(profData)
          })
        }
      })
    },[])


    return(

        <profileContext.Provider value={[profile, setProfile] }>
           {children}
        </profileContext.Provider>

    )
}

export default ProfileProvider