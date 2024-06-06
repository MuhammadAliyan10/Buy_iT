import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WebContext } from "./Context/WebContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WebContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WebContext>
);
