import { getItems } from 'utils/swapi';

export const STARSHIPS_REQUEST = 'duco/starships/STARSHIPS_REQUEST';
export const STARSHIPS_RESPONSE = 'duco/starships/STARSHIPS_RESPONSE';
export const STARSHIPS_FAILURE = 'duco/starships/STARSHIPS_FAILURE';

const initialState = {
  items: {},
  loading: false,
  error: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STARSHIPS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isFetched: false,
      };
    case STARSHIPS_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        isFetched: true,
        items: { ...state.items, ...{[action.result.url]: action.result } },
      };
    case STARSHIPS_FAILURE:
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

export const getStarship = uri => {
  return {
    types: [STARSHIPS_REQUEST, STARSHIPS_RESPONSE, STARSHIPS_FAILURE],
    promise: client => client.get(uri).then(response => response.data)
  };
};
