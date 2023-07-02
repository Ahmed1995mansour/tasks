import { AppState, Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import App from './App';
import { getAuth0ClientId, getAuth0Domain } from './helpers/helpers';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

type Props = {
  children: any;
};

const Auth0ProviderWithRedirectCallback: React.FC<Props> = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain={getAuth0Domain()}
      clientId={getAuth0ClientId()}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      {...props}
    >
      {children}
    </Auth0Provider>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback>
        <App />
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
