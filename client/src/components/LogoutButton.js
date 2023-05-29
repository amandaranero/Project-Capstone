import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const { logout } = useAuth0();

  function handleLogout(){
    fetch('/logout',{
      method: 'DELETE'
    }).then((resp)=>{
      if (resp.ok){
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    })
  }


  return (
    <Button variant="outlined"onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;