import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'



function Home(){
    const {user,isAuthenticated} = useAuth0();

    return(
        isAuthenticated && (
            <header className="bg-gray-100 p-6">
          </header>

        )
    )
}

export default Home