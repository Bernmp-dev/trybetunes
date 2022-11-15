import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

export class Album extends Component {
  state = { isLoading: false, musicIndex: [], favCheck: [] };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const data = await getMusics(id);
    const response = await getFavoriteSongs();
    console.log(response);

    // const retrieved = response.map(({ trackName }) => ({ [trackName]: true }))
    //   .reduce((acc, curr) => ({ ...acc, ...curr }));

    this.setState({ musicIndex: data });
  }

  checkFavorite = async ({ target }) => {
    const { name, checked } = target;
    const { musicIndex, favCheck } = this.state;
    const selectedSong = musicIndex.find(({ trackName }) => trackName === name);

    this.setState({ favCheck: { ...favCheck, [name]: checked } });

    this.setState({ isLoading: true });
    await addSong(selectedSong);
    this.setState({ isLoading: false });
    // console.log(Array.prototype.indexOf.call(favCheck, selectedSong));
  };

  render() {
    const { musicIndex, isLoading } = this.state;

    const template = musicIndex
      .map(({ artistName, collectionName, artworkUrl100 }) => (
        <div key={ collectionName }>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">{ collectionName }</h2>
          <h4 data-testid="artist-name">{ artistName }</h4>
        </div>
      ))[0];

    const musicTemplate = () => {
      const { favCheck } = this.state;

      return (musicIndex.slice(1)
        .map(({ previewUrl, trackName, trackNumber, trackId }) => (
          <div key={ trackName + trackNumber }>
            <h4>{ trackName }</h4>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track
                kind="captions"
              />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name={ trackName }
                id={ trackId }
                onChange={ (e) => this.checkFavorite(e) }
                checked={ favCheck[trackName] }
              />
            </label>
          </div>
        )));
    };

    return (
      <div data-testid="page-album">
        {template}
        {(isLoading) ? <Loading /> : musicTemplate()}
      </div>
    );
  }
}

export default Album;

// Album.defaultProps = { match: { params: { id: '' } } };

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
