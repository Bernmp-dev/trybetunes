import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

export class Profile extends Component {
  state = { isLoading: false, userInfo: [] };

  async componentDidMount() {
    const { userInfo } = this.state;

    // if (userInfo.length > 0) {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({ userInfo: data });
    this.setState({ isLoading: false });
    // }
    console.log(Object.values(userInfo));
  }

  // async componentDidUpdate(prevp, prevs) {
  //   const { userInfo } = this.state;
  //   if (prevs.userInfo !== userInfo) {
  //     const data = await getUser();
  //     this.setState({ userInfo: data });
  //   }
  // }

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
            data-testid="link-to-profile"
          >
            <span>Editar perfil</span>
          </Link>
        </section>)
      )
    );
  }
}

export default Profile;
