import expect from 'expect';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import * as courseActions from './courseActions';

describe('course actions', () => {
  describe('loadCoursesSuccess', () => {
    it('should create a LOAD_COURSES_SUCCESS action', () => {
      const courses = [
        {
          id: "react-flux-building-applications",
          title: "Building Applications in React and Flux",
          watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
          authorId: "cory-house",
          length: "5:08",
          category: "JavaScript"
        },
        {
          id: "clean-code",
          title: "Clean Code: Writing Code for Humans",
          watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
          authorId: "cory-house",
          length: "3:10",
          category: "Software Practices"
        }
      ];
      const expected = {type: 'LOAD_COURSES_SUCCESS', courses: courses};

      expect(courseActions.loadCoursesSuccess(courses)).toEqual(expected);
    });
  });
});


const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    //Here's an example call to nock.
    //nock('http://example.com')
    //  .get('/courses')
    //  .reply(200, {body: {course: [{id: 1, firstName: 'Cory', lastName: 'House'}]}})


    const expectedActions = [
      {type: 'BEGIN_AJAX_CALL'},
      {type: 'LOAD_COURSES_SUCCESS', body: {id: 'clean-code', title: 'Clean Code'}}
    ];

    //calling the mockStore and sending it some initial state and actions
    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('BEGIN_AJAX_CALL');
      expect(actions[1].type).toEqual('LOAD_COURSES_SUCCESS');
      done();
    });
  });
});
