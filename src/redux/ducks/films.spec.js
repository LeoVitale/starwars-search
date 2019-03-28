import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockFilm from '../../mock/film.json';

import {
  FILMS_REQUEST,
  FILMS_RESPONSE,
  FILMS_FAILURE,
  getFilm,
} from './films';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates FILMS_RESPONSE action when fetching film has been done', () => {
      const uri = 'http://localhost/film.json';
      axiosMock.onGet(uri).reply(200, mockFilm);
      const store = mockStore({ films: {} });
      const expectedActions = [
        {
          type: FILMS_REQUEST,
        },
        {
          type: FILMS_RESPONSE,
          result: { ...mockFilm },
        },
      ];

      return store.dispatch(getFilm(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates FILMS_FAILURE action when fetching film has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/film.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ films: {} });
      const expectedActions = [
        {
          type: FILMS_REQUEST,
        },
        {
          type: FILMS_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(getFilm(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
