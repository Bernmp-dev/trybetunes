import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NotFound extends Component {
  render() {
    const { match: { params: { not } } } = this.props;
    return (
      <span data-testid="page-not-found">{`${not} NotFound`}</span>
    );
  }
}

export default NotFound;

// NotFound.defaultProps = { match: { params: { not: '' } } };

NotFound.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      not: PropTypes.string,
    }),
  }).isRequired,
};
