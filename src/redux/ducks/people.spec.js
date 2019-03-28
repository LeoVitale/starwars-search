import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import clientMiddleware from '../middlewares/clientMiddleware';
import mockPeople from '../../mock/people.json';

import {
  PEOPLE_REQUEST,
  PEOPLE_RESPONSE,
  PEOPLE_FAILURE,
  PEOPLE_SELECTED,
  getPeople,
  selectPerson,
} from './people';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk, clientMiddleware(axios)];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  describe('fetchUsers', () => {
    it('creates PEOPLE_RESPONSE action when fetching people has been done', () => {
      const uri = 'http://localhost/people.json';
      axiosMock.onGet(uri).reply(200, mockPeople);
      const store = mockStore({ people: {} });
      const expectedActions = [
        {
          type: PEOPLE_REQUEST,
        },
        {
          type: PEOPLE_RESPONSE,
          result: { ...mockPeople },
        },
      ];

      return store.dispatch(getPeople(uri)).then(() => {
        const result = store.getActions();
        expect(result).toMatchObject(expectedActions);
      });
    });

    it('creates PEOPLE_FAILURE action when fetching people has been done', () => {
      axiosMock.reset();
      const uri = 'http://localhost/people.json';
      axiosMock.onGet(uri).reply(400);
      const store = mockStore({ people: {} });
      const expectedActions = [
        {
          type: PEOPLE_REQUEST,
        },
        {
          type: PEOPLE_FAILURE,
          error: 400
        },
      ];

      return store
        .dispatch(getPeople(uri))
        .catch(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('should create an action to select a character', () => {
      const expectedAction = {
        type: PEOPLE_SELECTED,
        payload: mockPeople,
      };
      const store = mockStore({
        people: {},
      });
      expect(store.dispatch(selectPerson(mockPeople))).toEqual(expectedAction);
    });
  });
});
