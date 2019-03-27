import React, { memo } from 'react';

import { CharacterName, BodyText, Subtitle } from 'components/atoms/Typography';
import Category from 'components/molecules/Category';
import { DetailsContext } from 'containers/Details/details-context';
import { Container, Section } from './styles';

const MetaOverlay = ({ people, meta }) => {
  const { name, birth_year, gender, films, species, starships, vehicles } = people;

  const {
    films: metaFilms,
    species: metaSpecies,
    starships: metaStarships,
    vehicles: metaVehicles,
  } = meta;
  return (
    <DetailsContext.Consumer>
      {({ getFilms, getVehicles, getSpecies, getStarships }) => {
        return (
          <Container>
            <div>
              <Section>
                <Subtitle tag="h3">Gender</Subtitle>
                <BodyText tag="p">{gender}</BodyText>
              </Section>
              <Section>
                <Subtitle tag="h3">Birth Year</Subtitle>
                <BodyText tag="p">{birth_year}</BodyText>
              </Section>
              <Category
                title="Species"
                fetchMethod={getSpecies}
                data={species}
                meta={metaSpecies}
                keyLabel="name"
              />
              <CharacterName tag="h1">{name}</CharacterName>
            </div>
            <div>
              <Category
                title="Vehicles"
                fetchMethod={getVehicles}
                data={vehicles}
                meta={metaVehicles}
                keyLabel="name"
              />
              <Category
                title="Starships"
                fetchMethod={getStarships}
                data={starships}
                meta={metaStarships}
                keyLabel="name"
              />
              <Category
                title="Films"
                fetchMethod={getFilms}
                data={films}
                meta={metaFilms}
                keyLabel="title"
              />
            </div>
          </Container>
        );
      }}
    </DetailsContext.Consumer>
  );
};

export default memo(MetaOverlay);
