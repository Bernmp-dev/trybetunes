import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Profile extends Component {
  state = { isLoading: false, userInfo: [] };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({ userInfo: data });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, userInfo } = this.state;
    return (
      (isLoading ? <Loading /> : (
        <section data-testid="page-profile">
          <img src={ userInfo.image } alt={ userInfo.name } data-testid="profile-image" />
          <p>{ userInfo.name }</p>
          <p>{ userInfo.email }</p>
          <p>{ userInfo.description }</p>
          <Link
            to="/profile/edit"
          >
            <span>Editar perfil</span>
          </Link>
        </section>)
      )
    );
  }
}

export default Profile;
