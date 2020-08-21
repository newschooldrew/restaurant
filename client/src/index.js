import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import App from './components/App/App.component';
import AuthProvider from './AuthProvider'
import { createBrowserHistory } from "history";
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/scss/now-ui-dashboard.scss?v=1.4.0";
import "./assets/demo/demo.css";
import "./assets/demo/react-demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import "bootstrap/dist/css/bootstrap.css";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <Router history={history}>
          <App />
        </Router>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
