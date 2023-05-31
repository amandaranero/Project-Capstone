import {createContext, useState, useEffect} from 'react'

export const usersContext = createContext()

const UsersProvider = ({children})=>{
    const [users, setUsers] = useState([])

    useEffect(()=>{
        fetch('/users')
        .then((resp)=>{
          if(resp.ok){
            resp.json()
            .then((user)=>{
              setUsers(user)
            })
          }else{
            console.log('error')
          }
        })
      }, [])

    return(

        <usersContext.Provider value={[users, setUsers]}>
            {children}
        </usersContext.Provider>

    )
}

export default UsersProvider