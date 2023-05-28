import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useContext} from 'react';
import { followingContext } from '../FollowingProvider';
import { followingListContext } from '../FollowingListProvider'
import Following from './Following'

function ProfilePage(){
    const {isAuthenticated, isLoading } = useAuth0();
    const [profile, setProfile] = useState([])
    const {name, username, bio, userimage} = profile
    const [following, setFollowing] = useContext(followingContext)
    const [followingList, setFollowingList] = useContext(followingListContext)
    const [list, setList] = useState([])


  //fetch the following data
  useEffect(()=>{
    fetch('/following')
    .then((resp)=>{
      if(resp.ok){
        resp.json()
        .then((followingData)=>{
          setFollowing(followingData)
        })
      }
    })
  },[])
  console.log(following)

  useEffect(()=>{
    const followingLists = following.map((followed)=>{
      return followed
    })
    setFollowingList(followingLists)
  },[])


  console.log(followingList)



    //FETCH PROFILE INFO
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


    if (isLoading) {
      return <div>Loading ...</div>;
    }


    return(
        isAuthenticated && (
            <div>
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
              <button>Following</button>
            </div> 
          )
        );
      };
    

export default ProfilePage