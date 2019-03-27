import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SearchResultName } from 'components/atoms/Typography';
import { Container, Picture } from './styles';

const SearchItem = ({ item, ...props }) => {
  return (
    <Container {...props}>
      <Picture src={`${process.env.PUBLIC_URL}/assets/images/characters/1.jpg`} />
      <SearchResultName>{item.name}</SearchResultName>
    </Container>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object,
};

SearchItem.defaultProps = {
  item: {},
};

export default memo(SearchItem);
