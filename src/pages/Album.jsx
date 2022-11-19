import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { MusicCard } from './MusicCard';

export class Album extends Component {
  state = { musicIndex: [] };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const data = await getMusics(id);
    this.setState({ musicIndex: data });
  }

  render() {
    const { musicIndex } = this.state;

    return (
      <div data-testid="page-album">
        {musicIndex.map(({ trackName, collectionName, artworkUrl100, artistName }) => (
          <div key={ `${trackName} Header` }>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h2 data-testid="album-name">{ collectionName }</h2>
            <h4 data-testid="artist-name">{ artistName }</h4>
          </div>
        ))[0]}
        {
          musicIndex.slice(1).map(({ trackName, trackNumber, trackId, previewUrl }) => (
            <div key={ `${trackName} Body` }>
              <MusicCard
                trackName={ trackName }
                trackNumber={ trackNumber }
                trackId={ Number(trackId) }
                previewUrl={ previewUrl }
                musicIndex={ musicIndex }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
