import './App.css';
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import LoginButton from './components/LoginButton';
// import Profile from './components/Profile';
import UserForm from './components/UserForm';
import ProfilePage from './components/ProfilePage';
import EventForm from './components/EventForm';
import LogoutButton from './components/Logout';
import Home from './components/Home'
import CommentForm from './components/CommentForm';
import Users from './components/Users';
import User from './components/User'
import Following from './components/Following';
import Followers from './components/Followers';
import Messages from './components/Messages'




function App() {
  const [following, setFollowing] = useState([])
  const [users, setUsers] = useState([])
  const [followers, setFollowers] = useState([])


  useEffect(()=>{
    fetch('/followers')
    .then((resp)=>resp.json())
    .then((followData)=> setFollowers(followData))
  }, [])

  console.log(followers)

  useEffect(()=>{
    fetch('/follow')
    .then((resp)=>resp.json())
    .then((follows)=> setFollowing(follows))
}, [])

  

  useEffect(()=>{
    fetch('/users')
    .then((resp)=>{
      if(resp.ok){
        resp.json()
        .then((user)=>{
          setUsers(user)
        })
      }else{
        console.log('error')
      }
    })
  }, [])
  
  console.log(users)



  return (
    <div className="App">
      <LoginButton users={users}/>
      <LogoutButton/>
      
      {/* <Profile/> */}
      <Routes>
        <Route path ="/users/:id" element={<User/>}/>
        <Route path="/users" element={<Users users={users}/>}/>
        <Route path = "/" element = {<Home/>}/>
        <Route path ="/commentform" element = {<CommentForm/>}/>
        <Route path = "/userform" element={<UserForm users={users}/>}/>
        <Route path = "/eventform" element={<EventForm users={users}/>}/>
        <Route path = "/profile" element={<ProfilePage/>}/>
        <Route path ='/following' element={<Following following={following}/>}/>
        <Route path ='/followers' element={<Followers followers={followers}/>}/>
        <Route path ='/messages/:id' element={<Messages/>}/>
      </Routes> 
    </div>
  );
}

export default App;
