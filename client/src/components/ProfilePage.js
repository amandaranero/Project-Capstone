import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from 'react';


function ProfilePage(){
    const { user, isAuthenticated, isLoading } = useAuth0();



    if (isLoading) {
      return <div>Loading ...</div>;
    }


    return(
        isAuthenticated && (
            <div>
                <Link to = {'/userform'}>
                    <button>Edit Your Profile</button>
                 </Link>
                <Link to = {'/eventform'}>
                    <button>Add an Event</button>
                </Link>
              {/* <img src={user.picture} alt={user.name} /> */}
              <h2>{user.name}</h2>
              {/* <h2>{user.username}</h2> */}
              <p>{user.email}</p>
            </div>
          )
        );
      };
    

export default ProfilePage