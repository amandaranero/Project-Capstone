import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext} from 'react';
import { profileContext } from '../ProfileProvider';
// import { followingContext } from '../FollowingProvider';
import Following from './Following';


function ProfilePage(){
    const {isAuthenticated} = useAuth0();
    const [profile, setProfile] = useContext(profileContext)
    const {name, username, bio, userimages, following, events} = profile



  //FETCH PROFILE INFO AND SET TO USECONTEXT STATE, PERHAPS WILL HOLD SPEC FOLLOWING BETTER
  useEffect(()=>{
      fetch('/profile')
      .then((resp)=>{
        if(resp.ok){
          resp.json()
          .then((profData)=>{
            setProfile(profData)
          })
        }
      })
    },[])


  console.log(profile)
  console.log(events)

    return(
        isAuthenticated && (
          <div>
              {/* <Following followingList={followingList}/> */}
              <h2>{name}</h2>
              <div>
              </div>
                <Link to = {'/userform'}>
                    <button>Edit Your Profile</button>
                 </Link>

                <Link to = {'/userevents'}>
                    <button>Your Events</button>
                </Link>
              {/* <img src={userimage} alt={name} /> */}
              <h2>{bio}</h2>
              <p>{username}</p>
              <Link to={'/following'}>
              <button>Following</button>

              </Link>
            </div> 
          )
        );
      };
    

export default ProfilePage