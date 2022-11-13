import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { Loading } from '../Loading';
import './Header.css';

export class Header extends Component {
  state = { user: {}, isLoading: false };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const newUser = await getUser();
    this.setState({ user: newUser, isLoading: false });
  }

  render() {
    const { isLoading, user } = this.state;
    return (
      <div data-testid="header-component" className="header">
        { isLoading ? <Loading /> : null}
        <h1 data-testid="header-user-name">
          { user.name }
        </h1>
        <Link to="/"><h3>Login</h3></Link>
        <Link to="/search"><h3>Search</h3></Link>
        <Link to="/favorites"><h3>Favoritos</h3></Link>
        <Link to="/profile"><h3>Profile</h3></Link>
      </div>
    );
  }
}

export default Header;
