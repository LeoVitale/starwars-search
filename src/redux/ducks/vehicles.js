import { getItems } from 'utils/swapi';

export const VEHICLES_REQUEST = 'duco/vehicles/VEHICLES_REQUEST';
export const VEHICLES_RESPONSE = 'duco/vehicles/VEHICLES_RESPONSE';
export const VEHICLES_FAILURE = 'duco/vehicles/VEHICLES_FAILURE';

const initialState = {
  items: {},
  loading: false,
  error: false,
  isFetched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VEHICLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        isFetched: false,
      };
    case VEHICLES_RESPONSE:
      return {
        ...state,
        loading: false,
        error: false,
        isFetched: true,
        items: { ...state.items, ...{[action.result.url]: action.result } },
      };
    case VEHICLES_FAILURE:
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

export const getVehicle = uri => {
  return {
    types: [VEHICLES_REQUEST, VEHICLES_RESPONSE, VEHICLES_FAILURE],
    promise: client => client.get(uri).then(response => response.data)
  };
};
