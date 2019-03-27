import React, { PureComponent } from 'react';
import Thumb from 'components/atoms/Thumb';
import MetaOverlay from 'components/molecules/MetaOverlay';
import { getImage } from 'utils/swapi';
import { DetailsContext } from './details-context';
import { Container, Overlay } from './styles';

class Details extends PureComponent {
  componentDidMount() {
    const { getPeople, people, match } = this.props;
    const id = match.params.id;
    if (!people[id]) {
      getPeople('people', id);
    }
  }

  render() {
    const {
      people,
      getFilms,
      getVehicles,
      getSpecies,
      getStarships,
      meta,
      match,
    } = this.props;
    const { id } = match.params;

    if (!people[id]) {
      return null;
    }

    return (
      <DetailsContext.Provider
        value={{ getFilms, getVehicles, getSpecies, getStarships }}
      >
        <Container>
          <Overlay />
          <Thumb id={id} src={getImage(id)} circle />
          <MetaOverlay people={people[id]} meta={meta} />
        </Container>
      </DetailsContext.Provider>
    );
  }
}

export default Details;
