import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";


// 1. Create the store
const store = configureStore({
  reducer: rootReducer,
});

// 2. Rehydrate from localStorage
// const token = JSON.parse(localStorage.getItem("token"));
// const user = JSON.parse(localStorage.getItem("user"));

// if (token) {
//   store.dispatch(setToken(token));
// }
// if (user) {
//   store.dispatch(setUser(user));
// }



// const store = configureStore({
//   reducer:rootReducer,
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
