import React from 'react';
import { mount } from 'enzyme';
import BackButton from './index';

const MountComponent = props => mount(<BackButton {...props} />);

describe('Render BackButton', () => {
  it('should render BackButton as expected', () => {
    const component = MountComponent();
    expect(component).toMatchSnapshot();
  });
});
