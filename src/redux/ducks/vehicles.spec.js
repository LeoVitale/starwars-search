import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import { VEHICLES_REQUEST, VEHICLES_RESPONSE, getVehicles } from './vehicles'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

const data = {
  'https://swapi.co/api/vehicles/4/': {
    name: 'Sand Crawler',
    model: 'Digger Crawler',
    manufacturer: 'Corellia Mining Corporation',
    cost_in_credits: '150000',
    length: '36.8',
    max_atmosphering_speed: '30',
    crew: '46',
    passengers: '30',
    cargo_capacity: '50000',
    consumables: '2 months',
    vehicle_class: 'wheeled',
    pilots: [],
    films: ['https://swapi.co/api/films/5/', 'https://swapi.co/api/films/1/'],
    created: '2014-12-10T15:36:25.724000Z',
    edited: '2014-12-22T18:21:15.523587Z',
    url: 'https://swapi.co/api/vehicles/4/',
  },
};

describe('async actions', () => {
  it('creates VEHICLES_RESPONSE when fetching people has been done', () => {
    const normalAxios = axios.create();
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const mockResponse = {
      ...data,
    };

    mock.onGet('https://swapi.co/api/vehicles/4/').reply(() => {
      return Promise.all([
        normalAxios.get('/api/starships/9/').then(resp => resp.data),
      ]).then(sources => [200, sources.reduce((agg, source) => agg.concat(source))]);
    });

    const expectedActions = [
      {
        type: VEHICLES_REQUEST,
      },
      {
        type: VEHICLES_RESPONSE,
        result: mockResponse,
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store.dispatch(getVehicles(['https://swapi.co/api/vehicles/4/'])).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
