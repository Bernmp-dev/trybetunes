import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Album extends Component {
  render() {
    const { match: { params: { id } } } = this.props;

    return (
      <div data-testid="page-album">{`Album ${id}`}</div>
    );
  }
}

export default Album;

// Album.defaultProps = { match: { params: { id: '' } } };

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
