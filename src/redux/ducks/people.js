import { getId } from 'utils/swapi';

const URL = (category, id) => `https://swapi.co/api/${category}/${id}/`;

export const PEOPLE_REQUEST = 'duco/people/PEOPLE_REQUEST';
export const PEOPLE_RESPONSE = 'duco/people/PEOPLE_RESPONSE';
export const PEOPLE_FAILURE = 'duco/people/PEOPLE_FAILURE';

export const PEOPLE_SELECTED = 'duco/people/PEOPLE_SELECTED';

const initialState = {
  person: {},
  people: {},
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PEOPLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PEOPLE_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        people: { ...state.people, [getId(action.result.url)]: action.result },
      };
    case PEOPLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        people: {},
      };
    case PEOPLE_SELECTED:
      return {
        ...state,
        people: { ...state.people, ...action.payload },
      };
    default:
      return state;
  }
};

export const getPeople = (category, id) => dispatch =>
  dispatch({
    types: [PEOPLE_REQUEST, PEOPLE_RESPONSE, PEOPLE_FAILURE],
    promise: client => client.get(URL(category, id)).then(response => response.data),
  });

export const selectPerson = person => dispatch =>
  dispatch({
    type: PEOPLE_SELECTED,
    payload: person,
  });
