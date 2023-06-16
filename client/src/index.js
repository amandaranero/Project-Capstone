import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider} from "@auth0/auth0-react";
import UserProvider from './UsersProvider';
import EventsProvider from './EventsProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ProfileProvider from './ProfileProvider';
import UserEventProvider from './UserEventProvider';
import LikesProvider from './LikesProvider';
import LikedEventsProvider from './LikedEventsProvider';
import FollowingEventsProvider from './FollowingEventsProvider';
import FollowingProvider from './FollowingProvider';
import FollowerProvider from './FollowersProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="dev-25w7agdwhg84ki1g.us.auth0.com"
      clientId="TJVpfRWiLNip9hWjrpGlAyoC1cpaKXvS"
      authorizationParams={{
        redirect_uri: "https://party-hat.vercel.app"
      }}
    >   
    <FollowerProvider>
      <FollowingProvider>
      <FollowingEventsProvider>
      <LikedEventsProvider>
      <LikesProvider>
      <UserEventProvider>
      <ProfileProvider>
      <EventsProvider>
      <UserProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                  <App />
            </ThemeProvider>,
      </UserProvider>
      </EventsProvider>
      </ProfileProvider>
      </UserEventProvider>
      </LikesProvider>
      </LikedEventsProvider>
      </FollowingEventsProvider>
      </FollowingProvider>
      </FollowerProvider>

    </Auth0Provider>

  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
