import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import App from './components/App/App.component';
import AuthProvider from './AuthProvider'
import { createBrowserHistory } from "history";
import { ToastProvider } from 'react-toast-notifications';
import Pusher from 'pusher-js';
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/scss/now-ui-dashboard.scss?v=1.4.0";
import "./assets/demo/demo.css";
import "./assets/demo/react-demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import "bootstrap/dist/css/bootstrap.css";

export const history = createBrowserHistory();

const pusher = new Pusher("935dc3cdb4bff1407359", {
  cluster: 'eu',
  encrypted: true
 });

ReactDOM.render(
  <React.StrictMode>
      <ToastProvider
        placement="top-right"
        TransitionState="entering">
        <AuthProvider>
          <Router history={history}>
            <App pusher={pusher}/>
          </Router>
        </AuthProvider>
      </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
