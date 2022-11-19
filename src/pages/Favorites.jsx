import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Loading } from './Loading';
import { MusicCard } from './MusicCard';

export class Favorites extends Component {
  state = { isLoading: false, storedFavs: [] };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await getFavoriteSongs();
    this.setState({ storedFavs: response, isLoading: false });
  }

  async componentDidUpdate(prevp, prevs) {
    const { storedFavs } = this.state;
    if (storedFavs !== prevs.storedFavs) {
      const response = await getFavoriteSongs();
      this.setState({ storedFavs: response });
    }
  }

  render() {
    const { storedFavs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        { isLoading ? <Loading /> : (
          storedFavs.map(({ trackName, trackNumber, trackId, previewUrl }) => (
            <div key={ trackName }>
              <MusicCard
                trackName={ trackName }
                trackNumber={ trackNumber }
                trackId={ Number(trackId) }
                previewUrl={ previewUrl }
                musicIndex={ storedFavs }
              />
            </div>
          )))}
      </div>
    );
  }
}

export default Favorites;
