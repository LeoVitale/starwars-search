import React from 'react';
import { mount } from 'enzyme';
import Category from './Category';

const MountComponent = props => mount(<Category {...props} />);

describe('Render Category', () => {
  it('should render Category as expected', () => {
    const component = MountComponent();
    expect(component).toMatchSnapshot();
  });

  it('should render Category with fetching items as expected', () => {
    const props = {
      fetchMethod: jest.fn(),
      data: [],
      meta: {
        items: {},
        loading: true,
        isFetched: false,
      },
    };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });

  it('should render Category with props as expected', () => {
    const props = {
      fetchMethod: jest.fn(),
      data: [
        'https://swapi.co/api/films/2/',
        'https://swapi.co/api/films/6/',
        'https://swapi.co/api/films/3/',
        'https://swapi.co/api/films/1/',
        'https://swapi.co/api/films/7/',
      ],
      meta: {
        items: {
          'https://swapi.co/api/films/2/': {
            name: 'Imperial Speeder Bike',
          },
        },
        loading: false,
        isFetched: true,
      },
    };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });
});
