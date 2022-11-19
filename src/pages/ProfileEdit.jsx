import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { Loading } from './Loading';

export class ProfileEdit extends Component {
  state = { isLoading: false, userInfo: [], shouldRedirect: false };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({ userInfo: data });
    this.setState({ isLoading: false });
  }

  onChangeHandler = ({ target: { name, value } }) => {
    const { userInfo } = this.state;
    this.setState({ userInfo: { ...userInfo, [name]: value } });
  };

  onClickHandler = () => {
    const { userInfo } = this.state;

    this.setState({ isLoading: true });
    updateUser(userInfo);
    this.setState({ isLoading: false });
    this.setState({ shouldRedirect: true });
  };

  validateButton = () => {
    const { userInfo: { name, email, image, description } } = this.state;
    if (name && email && image && description) {
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const nameValidate = name.length > 0;
      const emailValidate = email.length > 0 && (email.match(mailformat) !== null);
      const descriptionValidate = description.length > 0;
      const imageValidate = image.length > 0;
      return nameValidate && emailValidate && descriptionValidate && imageValidate;
    }
    return false;
  };

  render() {
    const { userInfo: { name, email, image, description },
      isLoading, shouldRedirect } = this.state;

    if (shouldRedirect) {
      return <Redirect to="/profile" />;
    } if (isLoading) {
      return <Loading />;
    }
    return (
      <section data-testid="page-profile-edit">
        <input
          type="text"
          name="name"
          data-testid="edit-input-name"
          placeholder="Name"
          value={ name }
          onChange={ this.onChangeHandler }
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          data-testid="edit-input-email"
          placeholder="Email"
          value={ email }
          onChange={ this.onChangeHandler }
        />
        <br />
        <br />
        <textarea
          name="description"
          rows="4"
          cols="20"
          value={ description }
          data-testid="edit-input-description"
          placeholder="Description"
          onChange={ this.onChangeHandler }
        />
        <br />
        <br />
        <input
          name="image"
          type="url"
          value={ image }
          data-testid="edit-input-image"
          placeholder="Profile Picture URL"
          onChange={ this.onChangeHandler }
        />
        <br />
        <br />
        <button
          type="button"
          disabled={ !this.validateButton() }
          onClick={ this.onClickHandler }
          data-testid="edit-button-save"
        >
          Salvar
        </button>
      </section>
    );
  }
}

export default ProfileEdit;
