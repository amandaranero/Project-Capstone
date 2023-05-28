import './App.css';
import FollowingProvider from './FollowingProvider';
import FollowingListProvider from './FollowingListProvider';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {useState, useEffect} from 'react'
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
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])

  
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
      <NavBar users={users}/>
      <FollowingListProvider>
      <FollowingProvider>
        <Routes>
          <Route path ="/userevents" element = {<UserEvents/>}/>
          <Route path ="/users/:id" element={<User/>}/>
          <Route path="/users" element={<Users users={users}/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path ="/commentform" element = {<CommentForm/>}/>
          <Route path = "/userform" element={<UserForm users={users}/>}/>
          <Route path = "/eventform" element={<EventForm users={users}/>}/>
          <Route path ='/followers' element={<Followers/>}/>
          {/* <Route path ='/messages/:id' element={<Messages/>}/> */}
          <Route path = '/events' element={<Events events={events}/>}/>
          <Route path ='/events/:id' element={<Event users={users} />}/>
          <Route path ='/following' element={<Following />}/>
          <Route path = "/profile" element={<ProfilePage events={events}/>}/>
      </Routes>
      </FollowingProvider>
      </FollowingListProvider>
    </div>
  );
}

export default App;
