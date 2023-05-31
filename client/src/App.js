import './App.css'
import {Routes, Route} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import ProfileProvider from './ProfileProvider';
import { usersContext } from './UsersProvider';
import { eventsContext } from './EventsProvider';
import {useState, useEffect, useContext} from 'react'
import NavBar from './components/NavBar'
import UserForm from './components/UserForm';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home'
import CommentForm from './components/CommentForm';
import Users from './components/Users';
import UserProfile from './components/UserProfile'
import Following from './components/Following';
import Followers from './components/Followers';
import Events from './components/Events'
import Event from './components/Event'
import UserEvents from './components/UserEvents';
import MessageContainer from './components/MessageContainer';




function App() {
  const {user} = useAuth0()
  const [users, setUsers] = useContext(usersContext)
  const [events, setEvents] = useContext(eventsContext)



  return (
    <div className="App" >      
      {/* <Profile/> */}
      <NavBar/>
      <ProfileProvider>
        <Routes>
          <Route path ="/userevents" element = {<UserEvents/>}/>
          <Route path ="/users/:id" element={<UserProfile/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path ="/commentform" element = {<CommentForm/>}/>
          <Route path = "/userform" element={<UserForm />}/>
          <Route path ='/followers' element={<Followers/>}/>
          <Route path = '/events' element={<Events/>}/>
          <Route path ='/events/:id' element={<Event />}/>
          <Route path ='/following' element={<Following />}/>
          <Route path = "/profile" element={<ProfilePage/>}/>
          <Route path='/messages' element={<MessageContainer/>}/>
          </Routes>
        </ProfileProvider>
    </div>
  );
}

export default App;
