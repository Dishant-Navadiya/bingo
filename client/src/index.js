import React from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { userReducer } from "./store/reducer/userReducer";
import App from "./App";
import "./index.css";

let store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// console.log(store.getState());
ReactDom.render(
  <Provider store={store}>  
    <App />
  </Provider>,
  document.getElementById("root")
);
