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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="dev-25w7agdwhg84ki1g.us.auth0.com"
      clientId="TJVpfRWiLNip9hWjrpGlAyoC1cpaKXvS"
      authorizationParams={{
        redirect_uri: "http://localhost:4000/"
      }}
    >   

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
    </Auth0Provider>

  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
