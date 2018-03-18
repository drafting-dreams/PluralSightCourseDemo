import expect from 'expect';
import courseReducer from './courseReducer';
import * as courseActions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when pass CREATE_COURSE_SUCCESS', () => {
    const initialState = [{title: 'A'}, {title: 'B'}];
    const newCourse = {title: 'C'};

    const newState = courseReducer(initialState, courseActions.createCourseSuccess(newCourse));

    expect(newState.length).toEqual(3);
    expect(newState[0].title).toBe('A');
    expect(newState[1].title).toBe('B');
    expect(newState[2].title).toBe('C');
  });

  it('should update course when pass UPDATE_COURSE_SUCCESS', () => {
    const initialState = [{id: 'A', title: 'A'}, {id: 'B', title: 'B'}];
    const newCourse = {id:'A', title: 'NewTitle'};

    const newState = courseReducer(initialState, courseActions.updateCourseSuccess(newCourse));

    const updatedCourse = newState.find(a => a.id === newCourse.id);
    const unTouchedCourse = newState.find(a => a.id === 'B');

    expect(newState.length).toEqual(2);
    expect(updatedCourse.title).toBe('NewTitle');
    expect(unTouchedCourse.title).toBe('B');
  });
});
