import React from 'react';
import {shallow} from 'enzyme';
import InitPageComponent from './InitPageContainer';

describe('<InitPageContainer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<InitPageComponent />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
