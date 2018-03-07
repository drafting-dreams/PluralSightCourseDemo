import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import {Provider} from "react-redux";
import routes from "./routes";
import './style/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';

//put initialState as a parameter from local storage
const store = configureStore();

render(
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')

);
