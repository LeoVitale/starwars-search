import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import { FILMS_REQUEST, FILMS_RESPONSE, getFilms } from './films'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

const data = {
  'https://swapi.co/api/films/1/': {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [
      'https://swapi.co/api/people/1/',
      'https://swapi.co/api/people/2/',
      'https://swapi.co/api/people/3/',
      'https://swapi.co/api/people/4/',
      'https://swapi.co/api/people/5/',
      'https://swapi.co/api/people/6/',
      'https://swapi.co/api/people/7/',
      'https://swapi.co/api/people/8/',
      'https://swapi.co/api/people/9/',
      'https://swapi.co/api/people/10/',
      'https://swapi.co/api/people/12/',
      'https://swapi.co/api/people/13/',
      'https://swapi.co/api/people/14/',
      'https://swapi.co/api/people/15/',
      'https://swapi.co/api/people/16/',
      'https://swapi.co/api/people/18/',
      'https://swapi.co/api/people/19/',
      'https://swapi.co/api/people/81/',
    ],
    planets: [
      'https://swapi.co/api/planets/2/',
      'https://swapi.co/api/planets/3/',
      'https://swapi.co/api/planets/1/',
    ],
    starships: [
      'https://swapi.co/api/starships/2/',
      'https://swapi.co/api/starships/3/',
      'https://swapi.co/api/starships/5/',
      'https://swapi.co/api/starships/9/',
      'https://swapi.co/api/starships/10/',
      'https://swapi.co/api/starships/11/',
      'https://swapi.co/api/starships/12/',
      'https://swapi.co/api/starships/13/',
    ],
    vehicles: [
      'https://swapi.co/api/vehicles/4/',
      'https://swapi.co/api/vehicles/6/',
      'https://swapi.co/api/vehicles/7/',
      'https://swapi.co/api/vehicles/8/',
    ],
    species: [
      'https://swapi.co/api/species/5/',
      'https://swapi.co/api/species/3/',
      'https://swapi.co/api/species/2/',
      'https://swapi.co/api/species/1/',
      'https://swapi.co/api/species/4/',
    ],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2015-04-11T09:46:52.774897Z',
    url: 'https://swapi.co/api/films/1/',
  },
};

describe('async actions', () => {
  it('creates FILMS_RESPONSE when fetching people has been done', () => {
    const normalAxios = axios.create();
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const mockResponse = {
      ...data,
    };

    mock.onGet('https://swapi.co/api/films/1/').reply(() => {
      return Promise.all([
        normalAxios.get('/api/films/9/').then(resp => resp.data),
      ]).then(sources => [200, sources.reduce((agg, source) => agg.concat(source))]);
    });

    const expectedActions = [
      {
        type: FILMS_REQUEST,
      },
      {
        type: FILMS_RESPONSE,
        result: mockResponse,
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store.dispatch(getFilms(['https://swapi.co/api/films/1/'])).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
