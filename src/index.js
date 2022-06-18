import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './others.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';

// Components
import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  document.getElementById('root')
);
