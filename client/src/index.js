import React from "react";
import App from "./Components/App";
import "./index.css";
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom';


const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
    <Router>
      <App />
    </Router>,
  )