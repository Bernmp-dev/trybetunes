import { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Login extends Component {
  state = {
    isLoading: false,
    shouldRedirect: false,
  };

  onClickHandler = async () => {
    const { name } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false, shouldRedirect: true });
  };

  render() {
    const { isLoading, shouldRedirect } = this.state;
    const { onChangeHandler, name } = this.props;
    const min = 3;

    if (shouldRedirect) {
      return <Redirect to="/search" />;
    } if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <input
          name="name"
          data-testid="login-name-input"
          type="text"
          id="login"
          onChange={ onChangeHandler }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          id="login"
          disabled={ name.length < min }
          onClick={ this.onClickHandler }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.defaultProps = { name: '', onChangeHandler: () => {} };

Login.propTypes = {
  name: PropTypes.string,
  onChangeHandler: PropTypes.func,
};

export default Login;
