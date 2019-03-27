import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import { FILMS_REQUEST, FILMS_RESPONSE, getFilms } from './films';
import mockFilm from '../../mock/film.json'; // You can use any testing library

const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  it('creates FILMS_RESPONSE when fetching people has been done', () => {
    const normalAxios = axios.create();
    const mockAxios = axios.create();
    const mock = new MockAdapter(mockAxios);
    const mockResponse = {
      ...mockFilm,
    };

    mock.onGet('https://swapi.co/api/films/1/').reply(() => {
      return Promise.all([normalAxios.get('/api/films/9/').then(resp => resp.data)]).then(
        sources => [200, sources.reduce((agg, source) => agg.concat(source))]
      );
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
