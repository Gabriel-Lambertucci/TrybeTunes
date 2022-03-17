import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../Style/Album.css';

const carregando = 'Carregando...';

class Album extends Component {
  constructor() {
    super();
    this.inputTarget = [];
    this.checked = '';
    this.artist = '';
    this.album = '';
    this.state = {
      ApiResult: [],
      loading: '',
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const id = pathname.replace(/[^0-9]/g, '');
    const result = await getMusics(id);
    this.inputTarget = await getFavoriteSongs();
    this.setState({ ApiResult: result, loading: 'off' });
  }

  onChangeHandler = async (target, ApiObject) => {
    this.checked = target.checked;
    this.setState({ loading: carregando });
    if (this.checked === true) {
      this.inputTarget.push(ApiObject);
      await addSong(ApiObject);
    }
    if (this.checked === false) {
      this.inputTarget = this.inputTarget.filter((item) => item.trackName !== target.id);
      await removeSong(ApiObject);
    }
    this.setState({ loading: 'off' });
  }

  showArtist = () => {
    const { ApiResult } = this.state;
    if (ApiResult.length > 0) {
      this.artist = ApiResult[0].artistName;
      this.album = ApiResult[0].albumName;
    }
    return (
      this.artist
    );
  }

  showAlbum = () => {
    const { ApiResult } = this.state;
    if (ApiResult.length > 0) {
      this.album = ApiResult[0].collectionName;
    }
    return (
      this.album
    );
  }

  inputTargetChecked = (trackName) => {
    const result = this.inputTarget.some((item) => item.trackName === trackName);
    return result;
  }

  showMusics = () => {
    const { location: { state } } = this.props;
    const { ApiResult, loading } = this.state;
    if (loading === 'off') {
      return (
        <div id="page-album" data-testid="page-album">
          <div id="div1">
            <img src={ state } alt="Album" />
            <h3 data-testid="album-name">{this.showAlbum()}</h3>
            <h4 data-testid="artist-name">{this.showArtist()}</h4>
          </div>
          <div id="div2">
            {ApiResult.lenght !== 0
              ? ApiResult.map((item, index) => (
                <MusicCard
                  ApiObject={ item }
                  trackId={ item.trackId }
                  key={ index }
                  trackName={ item.trackName }
                  previewUrl={ item.previewUrl }
                  onChange={ this.onChangeHandler }
                  checked={ this.inputTargetChecked(item.trackName) }
                />)) : null }
          </div>
        </div>
      );
    } if (loading === carregando || loading === '') {
      return (
        <h2>{ carregando }</h2>
      );
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.showMusics()}
      </>
    );
  }
}

Album.defaultProps = {
  pathname: undefined,
};

Album.propTypes = {
  location: PropTypes.objectOf(PropTypes.shape()).isRequired,
  pathname: PropTypes.string,
};

export default Album;
