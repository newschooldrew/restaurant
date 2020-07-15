import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.component';
import AuthProvider from './AuthProvider'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
