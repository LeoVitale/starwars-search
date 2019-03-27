import React from 'react';
import { mount } from 'enzyme';
import SearchItem from './index';

const MountComponent = props => mount(<SearchItem {...props} />);

describe('Render SearchItem', () => {
  const props = {
    item: {
      name: 'luke',
      url: 'http/url/1',
    },
  };

  const component = MountComponent(props);

  it('should render SearchItem as expected', () => {
    expect(component).toMatchSnapshot();
  });
});
