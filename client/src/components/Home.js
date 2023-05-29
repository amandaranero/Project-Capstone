import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'



function Home(){
    const {user,isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <div>
            <h2>Hi {user.name}</h2>
        </div>

        )
    )
}

export default Home