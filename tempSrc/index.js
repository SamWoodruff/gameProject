import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./config/store";
import ViewPort from './GameObjects/ViewPort'

ReactDOM.render(
  <Provider store={store}>
    <ViewPort />
  </Provider>,
  document.getElementById("root")
);
