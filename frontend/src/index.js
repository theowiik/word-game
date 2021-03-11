import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { apiBaseUrl } from "services/urlConstants";
import App from './App';
import './main.css';
import reportWebVitals from './reportWebVitals';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = apiBaseUrl;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
