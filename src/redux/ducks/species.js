import { getItems } from 'utils/swapi';

export const SPECIES_REQUEST = 'duco/species/SPECIES_REQUEST';
export const SPECIES_RESPONSE = 'duco/species/SPECIES_RESPONSE';
export const SPECIES_FAILURE = 'duco/species/SPECIES_FAILURE';

const initialState = {
  items: {},
  loading: false,
  error: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SPECIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isFetched: false,
      };
    case SPECIES_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        isFetched: true,
        items: { ...state.items, ...action.result },
      };
    case SPECIES_FAILURE:
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

export const getSpecies = urls => {
  return {
    types: [SPECIES_REQUEST, SPECIES_RESPONSE, SPECIES_FAILURE],
    promise: () => getItems(urls),
  };
};
