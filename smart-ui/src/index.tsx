import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import "./index.css";
import App from "./App";

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);