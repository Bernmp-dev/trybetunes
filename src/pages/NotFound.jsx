import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NotFound extends Component {
  render() {
    const { match: { params: { not } } } = this.props;
    return (
      <div data-testid="page-not-found">{`${not} NotFound`}</div>
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
