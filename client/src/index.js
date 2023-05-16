import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="dev-25w7agdwhg84ki1g.us.auth0.com"
      clientId="TJVpfRWiLNip9hWjrpGlAyoC1cpaKXvS"
      authorizationParams={{
        redirect_uri: "http://localhost:4000",
        audience: "https://dev-25w7agdwhg84ki1g.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
        <App />
    </Auth0Provider>
  </BrowserRouter>
  
  </React.StrictMode>
);

reportWebVitals();
