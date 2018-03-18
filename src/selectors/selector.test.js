import expect from 'expect';
import {authorsFormattedForDropDown} from './selector';

describe('Author Selectors', () => {
  describe('authorsFormattedForDropDown', () => {
    it('return authors formatted data for drop down', () => {
      const input = [
        {id: 'drafting-dreams', firstName: 'Drafting', lastName: 'Dreams'},
        {id: 'corry-house', firstName: 'Cory', lastName: 'House'}
      ];

      const expected = [
        {value: 'drafting-dreams', text: 'Drafting Dreams'},
        {value: 'corry-house', text: 'Cory House'}
      ];

      expect(authorsFormattedForDropDown(input)).toEqual(expected);
    });
  });
});
