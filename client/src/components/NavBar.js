import LoginButton from "./LoginButton"
import LogoutButton from "./LogoutButton"
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'



function NavBar(){
    const {isAuthenticated} = useAuth0()
    
    if (!isAuthenticated){
        return(
            <div>
                <LoginButton/>     
            </div>
        )
    }else{
        return(
            <div>
                <Link to ={'/'}>
                    <button>Home</button>
                </Link>
                <Link to ={'/profile'}>
                    <button>Your Profile</button>
                </Link>
                <LogoutButton/>
            </div>
        ) 
    }
}

export default NavBar