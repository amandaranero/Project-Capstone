import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useAuth0 } from "@auth0/auth0-react";



function NavBar({users}){
    const {isAuthenticated} = useAuth0()
    
    if (!isAuthenticated){
        return(
            <div>
                <LoginButton users={users}/>
                
            </div>
        )
    }else{
        return(
            <div>
                <LogoutButton/>
            </div>
        ) 
    }
}

export default NavBar