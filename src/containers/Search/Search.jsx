import React, { PureComponent } from 'react';
import Input from 'components/atoms/Input';
import { Container } from './styles';

class Search extends PureComponent {
  state = {
    term: '',
  };

  searchOnChange = ({ target }) => {
    const { value } = target;
    this.setState(state => ({ state, term: value }));
  };

  render() {
    const { term } = this.state;
    return (
      <Container>
        <Input
          placeholder="Search for characters"
          onChange={this.searchOnChange}
          value={term}
        />
      </Container>
    );
  }
}

export default Search;
