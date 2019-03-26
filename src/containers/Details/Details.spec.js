import React from 'react';
import { mount } from 'enzyme';
import Details from './Details';

const MountComponent = props => mount(<Details {...props} />);

describe('Render Details', () => {
  const component = MountComponent();

  it('should render Details as expected', () => {
    expect(component).toMatchSnapshot();
  });
});
