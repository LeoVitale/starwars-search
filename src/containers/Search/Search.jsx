import React, { PureComponent } from 'react';
import debounce from 'debounce';
import Input from 'components/atoms/Input';
import SearchItem from 'components/molecules/SearchItem';
import { getId } from 'utils/swapi';
import { Container, SearchResults } from './styles';

class Search extends PureComponent {
  state = {
    term: '',
  };

  setDebouncedSearch = debounce(term => {
    const { searchTerm } = this.props;
    term && searchTerm('people', term);
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
          {/* <Trail
            native
            keys={item => item.url}
            items={searchResults.results}
            from={{ opacity: 0, x: -100 }}
            to={{ opacity: isFetched ? 1 : 0, x: isFetched ? 0 : 100 }}
          >
            {person => ({ x, opacity }) => {
              return (
                <animated.div
                  style={{
                    opacity,
                    transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                  }}
                >
                  <SearchItem onClick={this.onClickPerson(person)} item={person} />
                </animated.div>
              );
            }}
          </Trail> */}
        </SearchResults>
      </Container>
    );
  }
}

export default Search;
