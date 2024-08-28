import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
    </GoogleOAuthProvider>,
);

serviceWorkerRegistration.unregister();
reportWebVitals();
