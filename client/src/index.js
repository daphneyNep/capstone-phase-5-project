import React from "react";
import App from "./Components/App";
import "./index.css";
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )