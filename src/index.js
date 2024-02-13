import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TodoContextProvider from "./contexts/todoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);
