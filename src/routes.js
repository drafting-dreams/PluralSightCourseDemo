import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/courses/CoursesPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}></Route>
    <Route path="courses" component={CoursesPage}></Route>
  </Route>
);
