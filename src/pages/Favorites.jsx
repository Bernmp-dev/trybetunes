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

  // shouldComponentUpdate(nexp, nexts) {
  //   const { storedFavs } = this.state;
  //   const newValue = (obj) => Object.values(obj);

  //   return newValue(storedFavs).length === 0;
  // }

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
                trackId={ trackId }
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
