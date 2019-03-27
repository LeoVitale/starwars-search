import React from 'react';
import { mount } from 'enzyme';
import Thumb from './index';

const MountComponent = props => mount(<Thumb {...props} />);

describe('Render Thumb', () => {
  it('should render Thumb as expected', () => {
    const component = MountComponent();
    expect(component).toMatchSnapshot();
  });

  it('should render circular Thumb', () => {
    const props = { circle: true };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });

  it('should render Thumb with image', () => {
    const props = { src: 'http://www.starwars.com/luke.jpg' };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });
});
