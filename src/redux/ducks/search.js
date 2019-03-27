const SEARCH_URL = (category, term) => `https://swapi.co/api/${category}/?search=${term}`;

export const FIND_PEOPLE_REQUEST = 'duco/people/FIND_PEOPLE_REQUEST';
export const FIND_PEOPLE_RESPONSE = 'duco/people/FIND_PEOPLE_RESPONSE';
export const FIND_PEOPLE_FAILURE = 'duco/people/FIND_PEOPLE_FAILURE';

const initialState = {
  searchResults: {},
  isFetched: false,
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FIND_PEOPLE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isFetched: false,
        searchResults: {},
      };
    case FIND_PEOPLE_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        isFetched: true,
        searchResults: action.result,
      };
    case FIND_PEOPLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        isFetched: false,
      };
    default:
      return state;
  }
};

export const searchTerm = (category, term) => dispatch =>
  dispatch({
    types: [FIND_PEOPLE_REQUEST, FIND_PEOPLE_RESPONSE, FIND_PEOPLE_FAILURE],
    promise: client =>
      client.get(SEARCH_URL(category, term)).then(response => response.data),
  });
