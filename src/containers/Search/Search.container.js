import { connect } from 'react-redux';
import { searchTerm } from 'ducks/search';
import { selectPerson } from 'ducks/people';
import Search from './Search';

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
  isFetched: state.search.isFetched,
});

const mapDispatchToProps = {
  searchTerm,
  selectPerson,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
