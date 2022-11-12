import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Login extends Component {
  state = {
    name: '',
    isLoading: false,
    shouldRedirect: false,
  };

  onChangeHandler = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  onClickHandler = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false, shouldRedirect: true });
  };

  render() {
    const { name, isLoading, shouldRedirect } = this.state;
    const min = 3;

    if (shouldRedirect) {
      this.setState({ shouldRedirect: false });
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <input
          name="name"
          data-testid="login-name-input"
          type="text"
          id="login"
          onChange={ this.onChangeHandler }
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
        {isLoading ? <Loading /> : null }
      </div>
    );
  }
}

export default Login;
