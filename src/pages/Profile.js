import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../Style/Profile.css';

const carregando = 'Carregando...';

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      ApiResult: '',
      loading: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: carregando });
    const result = await getUser();
    this.setState({ ApiResult: result, loading: 'off' });
  }

  showProfile() {
    const { loading, ApiResult } = this.state;
    if (loading === 'off') {
      return (
        <div id="page-profile" data-testid="page-profile">
          <img id="profile-img" data-testid="profile-image" src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="" />
          <section id="profile-section">
            <div className="profile-items">
              <h3>Nome:</h3>
              <p>{ ApiResult.name }</p>
            </div>
            <div className="profile-items">
              <h3>E-mail:</h3>
              <p id="email">{ ApiResult.email }</p>
            </div>
            <div className="profile-items">
              <h3>Descrição:</h3>
              <p>{ ApiResult.description }</p>
            </div>
          </section>
          <Link id="profile-link" to="/profile/edit">
            <button
              id="profile-button"
              type="button"
            >
              Editar perfil
            </button>
          </Link>
        </div>

      );
    }
    if (loading === '' || loading === carregando) {
      return <h2>Carregando...</h2>;
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.showProfile()}
      </>
    );
  }
}

Profile.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Profile;
