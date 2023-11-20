import React from "react";
import ReactDOM from "react-dom/client";

import "./bootstrap/spacelab-bootstrap.min.css";
// before importing index.css we want to import the bootstaps themes
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or enhancers as needed
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
