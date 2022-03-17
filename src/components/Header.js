import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../Style/Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { name } = await user;
    this.setState({ nome: name });
  }

  render() {
    const { nome } = this.state;
    return (
      <header data-testid="header-component">
        <div id="name">
          <div id="header-image">
            <Link id="home-link" to="./">
              <img src="https://cdn-icons.flaticon.com/png/512/2140/premium/2140829.png?token=exp=1644862103~hmac=7ae206299f7258c3e0d7ffce676de963" alt="Trybe Tunes" />
              <h4>Trybe Tunes</h4>
            </Link>
          </div>
          <div id="name-box">
            {nome !== ''
              ? <p data-testid="header-user-name">{nome}</p> : <p>Carregando...</p>}
          </div>
        </div>
        <div id="pages">
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
