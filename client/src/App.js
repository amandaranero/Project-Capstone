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



function App() {

  const [users, setUsers] = useState([])

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
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/userform" element={<UserForm users={users}/>}/>
        <Route path = "/eventform" element={<EventForm users={users}/>}/>
        <Route path = "/profile" element={<ProfilePage/>}/>
      </Routes> 
    </div>
  );
}

export default App;
