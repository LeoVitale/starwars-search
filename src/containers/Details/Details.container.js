import { connect } from 'react-redux';
import { getPeople } from 'ducks/people';
import { getFilms } from 'ducks/films';
import { getVehicles } from 'ducks/vehicles';
import { getStarships } from 'ducks/starships';
import { getSpecies } from 'ducks/species';
import Details from './Details';

const mapStateToProps = state => ({
  app: state.app,
  people: state.people.people,
  person: state.people.person,
  meta: {
    films: state.films,
    starships: state.starships,
    vehicles: state.vehicles,
    species: state.species,
  },
});

const mapDispatchToProps = {
  getPeople,
  getFilms,
  getVehicles,
  getStarships,
  getSpecies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
