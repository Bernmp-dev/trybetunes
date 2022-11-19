import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import { Loading } from './Loading';

export class ProfileEdit extends Component {
  state = { isLoading: false, userInfo: [] };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({ userInfo: data });
    this.setState({ isLoading: false });
  }

  // onChangeHandler = () => {

  // }

  render() {
    const { isLoading, userInfo } = this.state;

    return (isLoading ? <Loading /> : (
      <section data-testid="page-profile-edit">
        <input type="text" name="" data-testid="edit-input-name" placeholder="Name" />
        <br />
        <br />
        <input type="email" name="" data-testid="edit-input-email" placeholder="Email" />
        <br />
        <br />
        <textarea
          rows="4"
          cols="20"
          data-testid="edit-input-description"
          placeholder="Description"
        />
        <br />
        <br />
        <input
          type="url"
          data-testid="edit-input-image"
          placeholder="Profile Picture URL"
        />
        <br />
        <br />
        <input
          type="button"
          name=""
          value="Salvar"
          data-testid="edit-button-save"
          disabled="fase"
        />
      </section>)
    );
  }
}

export default ProfileEdit;
