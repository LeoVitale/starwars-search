import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockSearch from '../../mock/search.json';

import {
  FIND_PEOPLE_REQUEST,
  FIND_PEOPLE_RESPONSE,
  FIND_PEOPLE_FAILURE,
  searchTerm,
} from './search';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates FIND_PEOPLE_RESPONSE action when fetching search has been done', () => {
      const uri = 'http://localhost/search.json';
      axiosMock.onGet(uri).reply(200, mockSearch);
      const store = mockStore({ searchs: {} });
      const expectedActions = [
        {
          type: FIND_PEOPLE_REQUEST,
        },
        {
          type: FIND_PEOPLE_RESPONSE,
          result: { ...mockSearch },
        },
      ];

      return store.dispatch(searchTerm(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates FIND_PEOPLE_FAILURE action when fetching search has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/search.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ searchs: {} });
      const expectedActions = [
        {
          type: FIND_PEOPLE_REQUEST,
        },
        {
          type: FIND_PEOPLE_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(searchTerm(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
