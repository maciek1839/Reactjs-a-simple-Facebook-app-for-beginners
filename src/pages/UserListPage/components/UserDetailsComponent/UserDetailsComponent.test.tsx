import React from 'react';

describe('<UserDetailsComponent />', () => {
  let component;

  beforeEach(() => {
    // component = shallow(<UserDetailsComponent />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
