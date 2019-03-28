import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockVehicles from '../../mock/vehicle.json';

import {
  VEHICLES_REQUEST,
  VEHICLES_RESPONSE,
  VEHICLES_FAILURE,
  getVehicle,
} from './vehicles';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates VEHICLES_RESPONSE action when fetching vehicle has been done', () => {
      const uri = 'http://localhost/vehicle.json';
      axiosMock.onGet(uri).reply(200, mockVehicles);
      const store = mockStore({ vehicles: {} });
      const expectedActions = [
        {
          type: VEHICLES_REQUEST,
        },
        {
          type: VEHICLES_RESPONSE,
          result: { ...mockVehicles },
        },
      ];

      return store.dispatch(getVehicle(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates VEHICLES_FAILURE action when fetching vehicle has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/vehicle.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ vehicles: {} });
      const expectedActions = [
        {
          type: VEHICLES_REQUEST,
        },
        {
          type: VEHICLES_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(getVehicle(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });
  });
});
