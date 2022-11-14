import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { Loading } from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { artist: '',
      artistBackup: '',
      isLoading: false,
      albums: [],
      isClicked: false };
  }

  shouldComponentUpdate() {
    const { albums } = this.state;
    return (albums);
  }

  async onClickSearch() {
    const { artist } = this.state;

    this.setState({ isLoading: true });
    const response = await searchAlbumsAPI(artist);
    this.setState({ isLoading: false, albums: response, artist: '', isClicked: true });
  }

  onChangeSearch = async ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value, artistBackup: value });
  };

  renderAlbums = () => {
    const { isClicked, albums } = this.state;
    const albumCard = albums
      .map(({ artistName, collectionName, artworkUrl100, collectionId }) => (
        <div
          key={ `${artistName} ${collectionId}` }
          className="AlbumCard"
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
          >
            <h4>{ collectionName }</h4>
          </Link>
          <h5>{ artistName }</h5>

        </div>));

    if (isClicked && albums.length > 0) {
      return albumCard;
    } if (isClicked && albums.length === 0) {
      return <h2>Nenhum álbum foi encontrado</h2>;
    } return null;
  };

  render() {
    const { isLoading, artist, artistBackup, isClicked } = this.state;
    const min = 2;

    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-search">
        <div>
          <input
            name="artist"
            data-testid="search-artist-input"
            type="text"
            onChange={ this.onChangeSearch }
            value={ artist }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ artist.length < min }
            onClick={ () => this.onClickSearch() }
          >
            Procurar
          </button>
        </div>
        <div>
          { isClicked ? <h2>{`Resultado de álbuns de: ${artistBackup}`}</h2> : null }
        </div>
        <div>
          {this.renderAlbums()}
        </div>
      </div>
    );
  }
}

export default Search;
