import React, { useEffect, useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { usersContext } from "../UsersProvider";
import Button from '@mui/material/Button';



const LoginButton = () => {
  const {user, loginWithRedirect, getAccessTokenSilently, isAuthenticated} = useAuth0();
  const {users} = useContext(usersContext)

  const navigate = useNavigate()

  function checkUsers(){
    if (isAuthenticated){
      navigate('/profile')
    }}


//NEED TO REDIRECT TO USERFORM IF NEW. 
//NOT WORKING WHERE I WANT IT TO...

  
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
          checkUsers()
          fetch('/users',{ 
            method: 'POST',
            headers:{
            "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
          })
          .then((resp) => resp.json())
          .then((data)=>{
            console.log("user added", data)
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
   <Button variant="outlined" onClick={()=> loginWithRedirect()}>Log In</Button>
  )
};
//fetch request my front end
// post that in my backend//
//add it if they exist 



export default LoginButton;