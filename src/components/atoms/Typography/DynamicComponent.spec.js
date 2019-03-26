import React from 'react';
import { mount } from 'enzyme';
import DynamicComponent from './DynamicComponent';

const MountComponent = props => mount(<DynamicComponent {...props} />);

describe('Render DynamicComponent', () => {
  it('should render DynamicComponent as expected', () => {
    const component = MountComponent();
    expect(component).toMatchSnapshot();
  })

  it('should render DynamicComponent with other tag', () => {
    const props = {
      tag: 'h3'
    }
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  })
});
