import React from 'react';
import { mount } from 'enzyme';
import SearchItem from './SearchItem';

const MountComponent = props => mount(<SearchItem {...props} />);

describe('Render SearchItem', () => {
  const props = {
    item: {
      name: '',
    },
  };

  const component = MountComponent(props);

  it('should render SearchItem as expected', () => {
    expect(component).toMatchSnapshot();
  });
});
