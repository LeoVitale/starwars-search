import React, { PureComponent } from 'react';
import debounce from 'debounce';
import Input from 'components/atoms/Input';
import SearchItem from 'components/molecules/SearchItem';
import { getId, searchUrl } from 'utils/swapi';
import { Container, SearchResults } from './styles';

class Search extends PureComponent {
  state = {
    term: '',
  };

  setDebouncedSearch = debounce(term => {
    const { searchTerm } = this.props;
    term && searchTerm(searchUrl('people', term));
  }, 500);

  searchOnChange = ({ target }) => {
    const { value } = target;
    this.setState(state => ({ ...state, term: value }));
    this.setDebouncedSearch(value);
  };

  onClickPerson = person => () => {
    const { selectPerson, history } = this.props;
    const id = getId(person.url);
    selectPerson({ [id]: person });
    history.push(`/details/${id}`);
  };

  render() {
    const { term } = this.state;
    const { searchResults, isFetched } = this.props;

    return (
      <Container>
        <Input
          placeholder="Search for characters"
          value={term}
          onChange={this.searchOnChange}
        />

        <SearchResults>
          {searchResults.results &&
            searchResults.results.map(person => (
              <SearchItem
                key={person.url}
                onClick={this.onClickPerson(person)}
                item={person}
              />
            ))}
        </SearchResults>
      </Container>
    );
  }
}

export default Search;
