import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./main.css";
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
