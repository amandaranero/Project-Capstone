import { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, redirect, useNavigate} from "react-router-dom";
import { profileContext } from "../ProfileProvider";
import Button from '@mui/material/Button';



const LoginButton = () => {
  const {user, loginWithRedirect, getAccessTokenSilently, isAuthenticated} = useAuth0();
  const [profile, setProfile] = useContext(profileContext)
  const [sessionUser, setSessionUser] = useState([])

  

//NEED TO REDIRECT TO USERFORM IF NEW. 
//NOT WORKING WHERE I WANT IT TO...
  //try fetching profile info on login
  
  useEffect(()=>{
    const getUserInfo = async (accessToken)=>{
      const url = "https://dev-25w7agdwhg84ki1g.us.auth0.com/userinfo"
      const resp = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (resp.ok){
        const userInfo = await resp.json()
          const userData = {
            name: userInfo.name,
            username: userInfo.nickname,
            email: userInfo.email,
            sub: userInfo.sub
          }
          fetch('/users',{ 
            method: 'POST',
            headers:{
            "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
          })
          .then((resp) => resp.json())
          .then((d)=>{ setSessionUser(d)
        
          })
          .catch((error)=>{
            console.log("Error adding", error)
          })
        }
    
        else {
           console.log("failed");
    }
    }
    const fetchUserInfo = async()=>{
      try{
        const accessToken = await getAccessTokenSilently()
        await getUserInfo(accessToken)
      } catch(error){
        console.log("error", error)
      }
    }
    fetchUserInfo()
  },[getAccessTokenSilently])


  return ( 

   <Button variant="contained" sx={{ backgroundColor: '#fff9e7'  }} onClick={()=> loginWithRedirect()}>Log In</Button>
  )
};




export default LoginButton;