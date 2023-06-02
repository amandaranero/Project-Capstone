import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import ProfileBar from "./ProfileBar";



function Home(){
    const {user,isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
                <div>
                    
                </div>

        )
    )
}

export default Home