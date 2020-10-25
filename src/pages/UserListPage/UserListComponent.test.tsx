import React from 'react';
import {shallow} from 'enzyme';
import {UserListPageContainer} from './UserListPageContainer';

describe('<UserListPageContainer />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<UserListPageContainer />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
