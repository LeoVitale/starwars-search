import { connect } from 'react-redux';
import { getPeople } from 'ducks/people';
import { getFilm } from 'ducks/films';
import { getVehicle } from 'ducks/vehicles';
import { getStarship } from 'ducks/starships';
import { getSpecie } from 'ducks/species';
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
  getVehicle,
  getStarship,
  getSpecie,
  getFilm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
