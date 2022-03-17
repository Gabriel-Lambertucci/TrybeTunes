import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../Style/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.content = '';
    this.state = {
      buttonDisabled: true,
      inputContent: '',
      showTags: true,
      apiArray: [],
      loading: '',
    };
  }

  handleClick = async () => {
    const { inputContent } = this.state;
    this.setState({
      buttonDisabled: true,
      showTags: false,
      loading: 'Carregando...',
      inputContent: '',
    });
    const result = await searchAlbumsAPI(inputContent);
    this.setState({
      showTags: '',
      apiArray: result,
    });
  };

  showOrNot = () => {
    const { buttonDisabled, inputContent, showTags } = this.state;
    const { loading, apiArray } = this.state;
    if (showTags) {
      return (
        <form autoComplete="off" className="search-div">
          <input
            className="artist-input"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            id="artist-input"
            placeholder="Nome do artista"
            type="text"
            value={ inputContent }
          />
          <button
            className="artist-button"
            disabled={ buttonDisabled }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.handleClick }
          >
            Procurar
          </button>
        </form>
      );
    }
    if (showTags === false) {
      return <h2 id="loading">{loading}</h2>;
    }
    if (showTags === '') {
      if (apiArray.length === 0) {
        return <h3>Nenhum álbum foi encontrado</h3>;
      }
      return (
        <>
          <form autoComplete="off" className="search-div">
            <input
              className="artist-input"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
              id="artist-input"
              placeholder="Nome do artista"
              type="text"
              value={ inputContent }
            />
            <button
              className="artist-button"
              disabled={ buttonDisabled }
              data-testid="search-artist-button"
              type="button"
              onClick={ this.handleClick }
            >
              Procurar
            </button>
          </form>
          <h3 id="results">
            {`Resultado de álbuns de  
            ${this.content}`}
          </h3>
          <div className="albums-div">
            {apiArray.map((item) => (
              <div className="album" key={ item.collectionId }>
                <img src={ item.artworkUrl100 } alt={ item.artistName } />
                <p id="artistName">{item.artistName}</p>
                <Link
                  className="link"
                  to={ {
                    pathname: `/album/${item.collectionId}`,
                    state: item.artworkUrl100,
                  } }
                  data-testid={ `link-to-album-${item.collectionId}` }
                >
                  {item.collectionName}
                </Link>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  updateContent = () => {
    const { inputContent } = this.state;
    this.content = inputContent;
  }

  handleChange = ({ target }) => {
    if (target.value.length < 2) {
      this.setState(
        {
          buttonDisabled: true,
          inputContent: target.value,
        },
        this.updateContent,
      );
    } else {
      this.setState(
        {
          buttonDisabled: false,
          inputContent: target.value,
        },
        this.updateContent,
      );
    }
  }

  render() {
    return (
      <main id="main-content" data-testid="page-search">
        <Header />
        {this.showOrNot()}
      </main>
    );
  }
}

export default Search;
