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
import Followers from './components/Followers';



function App() {
  const [followers, setFollowers] = useState([])
  const [users, setUsers] = useState([])


  useEffect(()=>{
    fetch('/follow')
    .then((resp)=>resp.json())
    .then((follows)=> setFollowers(follows))
}, [])

  console.log(followers)

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
        <Route path ='/followers' element={<Followers followers={followers}/>}/>
      </Routes> 
    </div>
  );
}

export default App;
