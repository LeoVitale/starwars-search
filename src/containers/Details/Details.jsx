import React, { PureComponent } from 'react';
import Thumb from 'components/atoms/Thumb';
import BackButton from 'components/atoms/BackButton';
import MetaOverlay from 'components/molecules/MetaOverlay';
import { getImage, getCategoryUrl } from 'utils/swapi';
import { DetailsContext } from './details-context';
import { Container, Overlay } from './styles';

class Details extends PureComponent {
  componentDidMount() {
    const { getPeople, people, match } = this.props;
    const id = match.params.id;
    if (!people[id]) {
      const url = getCategoryUrl('people', id);
      getPeople(url);
    }
  }

  backToSearch = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const {
      people,
      getFilm,
      getVehicle,
      getSpecie,
      getStarship,
      meta,
      match,
    } = this.props;
    const { id } = match.params;

    if (!people[id]) {
      return null;
    }

    return (
      <DetailsContext.Provider
        value={{ getFilm, getSpecie, getStarship, getVehicle }}
      >
        <Container>
          <Overlay />
          <Thumb id={id} src={getImage(id)} circle />
          <MetaOverlay people={people[id]} meta={meta} />
          <BackButton onClick={this.backToSearch} />
        </Container>
      </DetailsContext.Provider>
    );
  }
}

export default Details;
