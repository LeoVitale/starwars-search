import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import { SPECIES_REQUEST, SPECIES_RESPONSE, getSpecies } from './species'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

const data = {
  'https://swapi.co/api/species/3/': {
    name: 'Wookiee',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '210',
    skin_colors: 'gray',
    hair_colors: 'black, brown',
    eye_colors: 'blue, green, yellow, brown, golden, red',
    average_lifespan: '400',
    homeworld: 'https://swapi.co/api/planets/14/',
    language: 'Shyriiwook',
    people: ['https://swapi.co/api/people/13/', 'https://swapi.co/api/people/80/'],
    films: [
      'https://swapi.co/api/films/2/',
      'https://swapi.co/api/films/7/',
      'https://swapi.co/api/films/6/',
      'https://swapi.co/api/films/3/',
      'https://swapi.co/api/films/1/',
    ],
    created: '2014-12-10T16:44:31.486000Z',
    edited: '2015-01-30T21:23:03.074598Z',
    url: 'https://swapi.co/api/species/3/',
  },
};

describe('async actions', () => {
  it('creates SPECIES_RESPONSE when fetching people has been done', () => {
    const normalAxios = axios.create();
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const mockResponse = {
      ...data,
    };

    mock.onGet('https://swapi.co/api/species/3/').reply(() => {
      return Promise.all([
        normalAxios.get('/api/species/3/').then(resp => resp.data),
      ]).then(sources => [200, sources.reduce((agg, source) => agg.concat(source))]);
    });

    const expectedActions = [
      {
        type: SPECIES_REQUEST,
      },
      {
        type: SPECIES_RESPONSE,
        result: mockResponse,
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store.dispatch(getSpecies(['https://swapi.co/api/species/3/'])).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
