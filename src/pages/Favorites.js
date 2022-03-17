import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../Style/Favorites.css';

const carregando = 'Carregando...';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      ApiResult: [],
      loading: carregando,
    };
  }

  async componentDidMount() {
    this.setState({ loading: carregando });
    const result = await getFavoriteSongs();
    this.setState({ ApiResult: result, loading: 'off' });
  }

  onChangeHandler = async (__target, musicObject) => {
    this.setState({ loading: carregando });
    await removeSong(musicObject);
    const result = await getFavoriteSongs();
    this.setState({ ApiResult: result, loading: 'off' });
  }

  onClickHandler = async () => {
    const { ApiResult } = this.state;
    this.setState({ loading: carregando });
    if (ApiResult.length > 0) {
      ApiResult.forEach(async (item) => removeSong(item));
    }
    this.setState({ ApiResult: [], loading: 'off' });
  }

  showFavoriteSongs() {
    const { loading, ApiResult } = this.state;
    if (loading === 'off') {
      return (
        <div id="page-favorites" data-testid="page-favorites">
          {ApiResult.map((item, index) => (
            <MusicCard
              ApiObject={ item }
              trackId={ item.trackId }
              key={ index }
              trackName={ item.trackName }
              previewUrl={ item.previewUrl }
              onChange={ this.onChangeHandler }
              checked="checked"
            />))}
          {ApiResult.length !== 0
            ? (
              <button
                id="remove-favorites-button"
                type="button"
                onClick={ this.onClickHandler }
              >
                Remover favoritas
              </button>) : <h2>Não há músicas favoritas!</h2>}
        </div>
      );
    }
    if (loading === carregando) {
      return <h2>Carregando...</h2>;
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.showFavoriteSongs()}
      </>
    );
  }
}

export default Favorites;
