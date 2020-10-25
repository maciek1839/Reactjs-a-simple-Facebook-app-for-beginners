import React from 'react';
import {shallow} from 'enzyme';
import NavbarComponent from './NavbarComponent';

describe('<NavbarComponent />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NavbarComponent />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
