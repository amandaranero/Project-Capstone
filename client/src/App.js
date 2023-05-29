import './App.css';
import {Routes, Route} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import ProfileProvider from './ProfileProvider';
import { usersContext } from './UsersProvider';
import { eventsContext } from './EventsProvider';
import {useState, useEffect, useContext} from 'react'
import NavBar from './components/NavBar'
import UserForm from './components/UserForm';
import ProfilePage from './components/ProfilePage';
import EventForm from './components/EventForm';
import Home from './components/Home'
import CommentForm from './components/CommentForm';
import Users from './components/Users';
import User from './components/User'
import Following from './components/Following';
import Followers from './components/Followers';
import Events from './components/Events'
import Event from './components/Event'
import UserEvents from './components/UserEvents';




function App() {
  const {user} = useAuth0()
  const [users, setUsers] = useContext(usersContext)
  const [events, setEvents] = useContext(eventsContext)


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
  
  useEffect(()=>{
    fetch('/events')
    .then((resp)=>{
      if (resp.ok){
        resp.json()
        .then((eventData)=>{
          setEvents(eventData)
        })
      }
    })
  }, [])




  return (
    <div className="App">      
      {/* <Profile/> */}
      <NavBar/>
      <ProfileProvider>
        <Routes>
          <Route path ="/userevents" element = {<UserEvents/>}/>
          <Route path ="/users/:id" element={<User/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path ="/commentform" element = {<CommentForm/>}/>
          <Route path = "/userform" element={<UserForm />}/>
          <Route path = "/eventform" element={<EventForm/>}/>
          <Route path ='/followers' element={<Followers/>}/>
          <Route path = '/events' element={<Events/>}/>
          <Route path ='/events/:id' element={<Event />}/>
          <Route path ='/following' element={<Following />}/>
          <Route path = "/profile" element={<ProfilePage/>}/>
          </Routes>
        </ProfileProvider>
    </div>
  );
}

export default App;
