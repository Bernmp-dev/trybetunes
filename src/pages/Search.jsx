import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  render() {
    const { onChangeHandler, artist } = this.props;
    const min = 2;
    return (
      <div data-testid="page-search">
        <input
          name="artist"
          data-testid="search-artist-input"
          type="text"
          onChange={ onChangeHandler }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ artist.length < min }
        >
          Procurar
        </button>
      </div>
    );
  }
}

Search.defaultProps = { artist: '', onChangeHandler: () => {} };

Search.propTypes = {
  artist: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

export default Search;
