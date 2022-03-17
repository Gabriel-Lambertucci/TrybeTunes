import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, checked, onChange, ApiObject } = this.props;
    return (
      trackName !== undefined
        ? (
          <div id="musicCard">
            <h4>
              { trackName }
            </h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <form autoComplete="off">
              <label className="cards-label" htmlFor={ trackName }>
                {checked ? <img id="coração-vermelho" src="https://cdn-icons-png.flaticon.com/512/833/833472.png" alt="coração-vermelho" /> : <img id="coração" src="https://cdn-icons-png.flaticon.com/512/32/32557.png" alt="coração" /> }
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  id={ trackName }
                  className="checkbox"
                  type="checkbox"
                  onChange={ ({ target }) => onChange(target, ApiObject) }
                  checked={ checked }
                />
              </label>
            </form>
          </div>) : null
    );
  }
}

MusicCard.defaultProps = {
  trackName: undefined,
  previewUrl: undefined,
  trackId: undefined,
};

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  ApiObject: PropTypes.objectOf((PropTypes.string)).isRequired,
};

export default MusicCard;
