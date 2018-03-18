/*eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import {Provider} from "react-redux";
import routes from "./routes";
import {loadCourses} from "./actions/courseActions";
import {loadAuthors} from "./actions/authorActions";
import './style/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';
import '../node_modules/toastr/build/toastr.min.css';

//put initialState as a parameter from local storage
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());


render(
  <Provider store = {store}>
    <div>
      <Router history={browserHistory} routes={routes} />
    </div>
  </Provider>,
  document.getElementById('app')
);
