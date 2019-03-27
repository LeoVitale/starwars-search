import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import {
  PEOPLE_REQUEST,
  PEOPLE_RESPONSE,
  PEOPLE_FAILURE,
  PEOPLE_SELECTED,
  getPeople,
  selectPerson,
} from './people'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

const data = {
  name: 'R2-D2',
  height: '96',
  mass: '32',
  hair_color: 'n/a',
  skin_color: 'white, blue',
  eye_color: 'red',
  birth_year: '33BBY',
  gender: 'n/a',
  homeworld: 'https://swapi.co/api/planets/8/',
  films: [
    'https://swapi.co/api/films/2/',
    'https://swapi.co/api/films/5/',
    'https://swapi.co/api/films/4/',
    'https://swapi.co/api/films/6/',
    'https://swapi.co/api/films/3/',
    'https://swapi.co/api/films/1/',
    'https://swapi.co/api/films/7/',
  ],
  species: ['https://swapi.co/api/species/2/'],
  vehicles: [],
  starships: [],
  created: '2014-12-10T15:11:50.376000Z',
  edited: '2014-12-20T21:17:50.311000Z',
  url: 'https://swapi.co/api/people/3/',
};

describe('async actions', () => {
  const mock = new MockAdapter(axios);
  it('creates PEOPLE_RESPONSE when fetching people has been done', () => {
    const mockResponse = {
      data,
    };
    const mockUrl = `https://swapi.co/api/people/3/`;
    mock.onGet(mockUrl).reply(200, {
      data,
    });

    const expectedActions = [
      {
        type: PEOPLE_REQUEST,
      },
      {
        type: PEOPLE_RESPONSE,
        result: mockResponse,
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store.dispatch(getPeople('people', '3')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates PEOPLE_FAILURE when fetching people has been done', () => {
    mock.reset();
    const mockUrl = `https://swapi.co/api/people/3/`;
    mock.onGet(mockUrl).reply(400);

    const expectedActions = [
      {
        type: PEOPLE_REQUEST,
      },
      {
        type: PEOPLE_FAILURE,
        error: 'Error: Request failed with status code 400',
      },
    ];

    const store = mockStore({
      people: {},
    });
    return store
      .dispatch(getPeople('people', '3'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should create an action to select a character', () => {
    const expectedAction = {
      type: PEOPLE_SELECTED,
      payload: data,
    };
    const store = mockStore({
      people: {},
    });
    expect(store.dispatch(selectPerson(data))).toEqual(expectedAction);
  });
});
