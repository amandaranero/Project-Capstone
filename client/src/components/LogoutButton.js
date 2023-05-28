import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;