import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import AboutPage from './components/about/AboutPage';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/courses/CoursesPage';
/*eslint-disable*/
import ManageCoursePage from "./components/courses/ManageCoursePage";
/*eslint-enable*/


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
