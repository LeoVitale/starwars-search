import { combineReducers } from 'redux';
import search from './search';
import people from './people';
import films from './films';
import vehicles from './vehicles';
import species from './species';
import starships from './starships';

const rootReducer = combineReducers({
  people,
  films,
  vehicles,
  species,
  starships,
  search,
});

export default rootReducer;
