import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(React.StrictMode, null,
    React.createElement(Router, null,
        React.createElement(App, null))));
