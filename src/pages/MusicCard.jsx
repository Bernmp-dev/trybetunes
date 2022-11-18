import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';

export class MusicCard extends Component {
  state = { isLoading: false, storedFavorites: [] };

  async componentDidMount() {
    const response = await getFavoriteSongs();
    this.setState({ storedFavorites: response });
  }

  async componentDidUpdate(__, prevs) {
    const { storedFavorites } = this.state;
    if (storedFavorites !== prevs.storedFavorites) {
      const response = await getFavoriteSongs();
      this.setState({ storedFavorites: response });
    }
  }

  favChecker = (track) => {
    const { storedFavorites } = this.state;
    return storedFavorites
      .some(({ trackName }) => track === trackName);
  };

  favHandler = async ({ target: { name } }) => {
    const { storedFavorites } = this.state;
    const { musicIndex } = this.props;

    const findSong = musicIndex
      .find(({ trackName }) => trackName === name);

    const findFav = storedFavorites
      .find((curr) => curr.trackName.includes(name));

    if (findFav) {
      this.favHelper(removeSong, findFav);
    } else {
      this.favHelper(addSong, findSong);
    }
  };

  favHelper = async (remOrAdd, song) => {
    this.setState({ isLoading: true });
    await remOrAdd(song);
    const response = await getFavoriteSongs();
    this.setState({ storedFavorites: response });
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, trackId, previewUrl } = this.props;
    const { isLoading } = this.state;

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
                onChange={ this.favHandler }
                checked={ this.favChecker(trackName) || false }
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
  musicIndex: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  })).isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
