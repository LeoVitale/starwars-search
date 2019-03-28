import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockStarship from '../../mock/starship.json';

import {
  STARSHIPS_REQUEST,
  STARSHIPS_RESPONSE,
  STARSHIPS_FAILURE,
  getStarship,
} from './starships';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates STARSHIPS_RESPONSE action when fetching starship has been done', () => {
      const uri = 'http://localhost/starship.json';
      axiosMock.onGet(uri).reply(200, mockStarship);
      const store = mockStore({ starships: {} });
      const expectedActions = [
        {
          type: STARSHIPS_REQUEST,
        },
        {
          type: STARSHIPS_RESPONSE,
          result: { ...mockStarship },
        },
      ];

      return store.dispatch(getStarship(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates STARSHIPS_FAILURE action when fetching starship has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/starship.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ starships: {} });
      const expectedActions = [
        {
          type: STARSHIPS_REQUEST,
        },
        {
          type: STARSHIPS_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(getStarship(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
