import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
