import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Search from './Search';

const mockStore = configureMockStore();
const store = mockStore({
  people: {},
});

const MountComponent = props => mount(<Search {...props} store={store} />);

describe('Render Search', () => {
  const props = {
    searchResults: {
      results: [],
    },
  };
  const component = MountComponent(props);

  it('should render Search as expected', () => {
    expect(component).toMatchSnapshot();
  });
});

describe('Search Events', () => {
  const props = {
    searchResults: {
      results: [],
    },
  };
  const component = MountComponent(props);

  it('should render Search as expected', () => {
    const input = component.find('input');
    input.simulate('change', {
      target: {
        value: 'luke',
      },
    });
    expect(component.state().term).toEqual('luke');
  });
});
