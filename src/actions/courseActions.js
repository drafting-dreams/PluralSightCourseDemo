import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return { type: 'LOAD_COURSES_SUCCESS', courses};
}

// A thunk always return a function that accept dispatch
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(err => {throw(err);});
  };
}
