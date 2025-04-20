import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // or wherever you place it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      <App />
    </AuthProvider>
  </React.StrictMode>
);