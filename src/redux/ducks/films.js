import { getItems } from 'utils/swapi';

export const FILMS_REQUEST = 'duco/films/FILMS_REQUEST';
export const FILMS_RESPONSE = 'duco/films/FILMS_RESPONSE';
export const FILMS_FAILURE = 'duco/films/FILMS_FAILURE';

const initialState = {
  items: {},
  loading: false,
  error: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isFetched: false,
      };
    case FILMS_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        isFetched: true,
        items: { ...state.items, ...action.result },
      };
    case FILMS_FAILURE:
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

export const getFilms = urls => {
  return {
    types: [FILMS_REQUEST, FILMS_RESPONSE, FILMS_FAILURE],
    promise: () => getItems(urls),
  };
};
