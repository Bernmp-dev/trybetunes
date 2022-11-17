import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

export class MusicCard extends Component {
  state = { isLoading: false,
    favCheck: [],
    storedFavorites: [],
  };

  async componentDidMount() {
    const response = await getFavoriteSongs();
    this.setState({ storedFavorites: response });

    if (response.length > 0) {
      const retrieved = response.map(({ trackName }) => ({ [trackName]: true }))
        .reduce((acc, curr) => ({ ...acc, ...curr }));
      this.setState({ favCheck: { ...retrieved } });
    }
  }

  async componentDidUpdate(prevp, prevs) {
    const { storedFavorites } = this.state;
    if (storedFavorites !== prevs.storedFavorites) {
      const response = await getFavoriteSongs();
      this.setState({ storedFavorites: response });
    }
  }

  checkFavorite = async ({ target: { name, checked } }) => {
    const { favCheck, storedFavorites } = this.state;
    const { musicIndex } = this.props;
    console.log(musicIndex);

    const selectedSong = musicIndex.find(({ trackName }) => trackName === name);

    const selectedFav = Object.values(storedFavorites)
      .find((curr) => curr.trackName.includes(name));

    this.setState({ favCheck: { ...favCheck, [name]: checked } });

    if (selectedFav) {
      this.remAddHandle(removeSong, selectedFav);
    } else {
      this.remAddHandle(addSong, selectedSong);
    }
  };

  remAddHandle = async (remOrAdd = false, song = false) => {
    this.setState({ isLoading: true });
    await remOrAdd(song);
    const response = await getFavoriteSongs();
    this.setState({ storedFavorites: response });
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading, favCheck } = this.state;

    return (
      <div>
        {isLoading ? <Loading /> : (
          <div>
            <h4>{ trackName }</h4>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                name={ trackName }
                id={ trackId }
                onChange={ this.checkFavorite }
                checked={ favCheck[trackName] || false }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musicIndex: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
