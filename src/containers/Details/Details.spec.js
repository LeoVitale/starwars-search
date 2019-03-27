import React from 'react';
import { mount } from 'enzyme';
import Details from './Details';

const MountComponent = props => mount(<Details {...props} />);

describe('Render Details', () => {
  it('should render Details as expected', () => {
    const props = {
      meta: {
        films: {},
        starships: {},
        vehicles: {},
        species: {},
      },
      people: {
        '1': {
          name: 'luke',
          url: 'http://luke/1',
        },
      },
      match: {
        params: {
          id: '1',
        },
      },
    };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });

  it('should render Details without people as expected', () => {
    const props = {
      getPeople: jest.fn(),
      meta: {
        films: {},
        starships: {},
        vehicles: {},
        species: {},
      },
      people: {},
      match: {
        params: {
          id: '1',
        },
      },
    };
    const component = MountComponent(props);
    expect(component).toMatchSnapshot();
  });
});
