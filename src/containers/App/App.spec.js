import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from './index';

const state = {
  search: {
    searchResults: {},
    isFetched: false,
  },
};
const mockStore = configureMockStore(state);
const store = mockStore(state);

const MountComponent = props =>
  mount(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );

describe('Render App', () => {
  const component = MountComponent();

  it('should render App as expected', () => {
    expect(component).toMatchSnapshot();
  });
});
