import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockSpecie from '../../mock/specie.json';

import {
  SPECIES_REQUEST,
  SPECIES_RESPONSE,
  SPECIES_FAILURE,
  getSpecie,
} from './species';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates SPECIES_RESPONSE action when fetching specie has been done', () => {
      const uri = 'http://localhost/specie.json';
      axiosMock.onGet(uri).reply(200, mockSpecie);
      const store = mockStore({ species: {} });
      const expectedActions = [
        {
          type: SPECIES_REQUEST,
        },
        {
          type: SPECIES_RESPONSE,
          result: { ...mockSpecie },
        },
      ];

      return store.dispatch(getSpecie(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates SPECIES_FAILURE action when fetching specie has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/specie.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ species: {} });
      const expectedActions = [
        {
          type: SPECIES_REQUEST,
        },
        {
          type: SPECIES_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(getSpecie(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
