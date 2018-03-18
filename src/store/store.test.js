import expect from 'expect';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import * as courseActions from '../actions/courseActions';

describe('store', () => {
  it('should handle creating courses', () => {
    //arrange
    const course = {id:'clean-code', title:"Clean Code"};
    const updatedCourse = {id:'clean-code', title:'clean code'};
    const store = createStore(rootReducer, initialState);

    //act
    store.dispatch(courseActions.createCourseSuccess(course));
    store.dispatch(courseActions.updateCourseSuccess(updatedCourse));

    //assert
    const actual = store.getState().courses[0];
    expect(actual).toEqual(updatedCourse);
  });
});
