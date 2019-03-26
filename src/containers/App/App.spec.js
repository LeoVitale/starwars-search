import React from 'react';
import { mount } from 'enzyme';
import App from './App';

const MountComponent = props => mount(<App {...props} />);

describe('Render App', () => {
  const component = MountComponent();

  it('should render Input as expected', () => {
    expect(component).toMatchSnapshot();
  });
});
