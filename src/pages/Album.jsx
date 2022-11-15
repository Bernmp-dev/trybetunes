import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

export class Album extends Component {
  state = { musicIndex: [] };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({ musicIndex: data });
  }

  render() {
    const { musicIndex } = this.state;
    console.log(musicIndex);

    const template = musicIndex
      .map(({ artistName, collectionName, artworkUrl100 }) => (
        <div key={ collectionName }>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h2 data-testid="album-name">{ collectionName }</h2>
          <h4 data-testid="artist-name">{ artistName }</h4>
        </div>
      ))[0];

    const musicTemplate = () => (
      musicIndex.slice(1).map(({ previewUrl, trackName, trackNumber }) => (
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
        </div>
      )));

    return (
      <div data-testid="page-album">
        {template}
        {musicTemplate()}
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
