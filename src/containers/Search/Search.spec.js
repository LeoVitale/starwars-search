import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';

const MountComponent = props => mount(<Search {...props} />);

describe('Render Search', () => {
  const component = MountComponent();

  it('should render Search as expected', () => {
    expect(component).toMatchSnapshot();
  });
});