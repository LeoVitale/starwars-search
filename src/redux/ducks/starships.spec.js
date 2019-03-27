import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import { STARSHIPS_REQUEST, STARSHIPS_RESPONSE, getStarships } from './starships'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

const data = {
  'https://swapi.co/api/starships/9/': {
    name: 'Death Star',
    model: 'DS-1 Orbital Battle Station',
    manufacturer: 'Imperial Department of Military Research, Sienar Fleet Systems',
    cost_in_credits: '1000000000000',
    length: '120000',
    max_atmosphering_speed: 'n/a',
    crew: '342953',
    passengers: '843342',
    cargo_capacity: '1000000000000',
    consumables: '3 years',
    hyperdrive_rating: '4.0',
    MGLT: '10',
    starship_class: 'Deep Space Mobile Battlestation',
    pilots: [],
    films: ['https://swapi.co/api/films/1/'],
    created: '2014-12-10T16:36:50.509000Z',
    edited: '2014-12-22T17:35:44.452589Z',
    url: 'https://swapi.co/api/starships/9/',
  },
};

describe('async actions', () => {
  it('creates STARSHIPS_RESPONSE when fetching people has been done', () => {
    const normalAxios = axios.create();
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const mockResponse = {
      ...data,
    };

    mock.onGet('https://swapi.co/api/starships/9/').reply(() => {
      return Promise.all([
        normalAxios.get('/api/starships/9/').then(resp => resp.data),
      ]).then(sources => [200, sources.reduce((agg, source) => agg.concat(source))]);
    });

    const expectedActions = [
      {
        type: STARSHIPS_REQUEST,
      },
      {
        type: STARSHIPS_RESPONSE,
        result: mockResponse,
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store
      .dispatch(getStarships(['https://swapi.co/api/starships/9/']))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
