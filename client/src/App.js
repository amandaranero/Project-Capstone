import './App.css';
import {Routes, Route} from 'react-router-dom'
import LoginButton from './components/LoginButton';
// import Profile from './components/Profile';
import UserForm from './components/UserForm';
import ProfilePage from './components/ProfilePage';
import EventForm from './components/EventForm';



function App() {



  return (
    <div className="App">
      <LoginButton/>
      {/* <Profile/> */}
      <Routes>
        <Route path = "/userform" element={<UserForm/>}/>
        <Route path = "/eventform" element={<EventForm/>}/>
        <Route path = "/profile" element={<ProfilePage/>}/>
      </Routes> 
    </div>
  );
}

export default App;
