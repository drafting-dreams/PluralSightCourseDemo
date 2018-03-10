import courseApi from '../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return { type: 'LOAD_COURSES_SUCCESS', courses};
}

export function createCourseSuccess(course) {
  return { type: 'CREATE_COURSE_SUCCESS', course};
}

export function updateCourseSuccess(course) {
  return { type: 'UPDATE_COURSE_SUCCESS', course};
}

// A thunk always return a function that accept dispatch
export function loadCourses() {
  return function(dispatch) {
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(err => {throw(err);});
  };
}

export function saveCourse(course) {
  return dispatch => {
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(err => {throw(err);});
  };
}
