import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../Style/ProfileEdit.css';

const carregando = 'Carregando...';

class ProfileEdit extends Component {
  state = {
    loading: '',
    buttonDisabled: true,
    inputName: '',
    inputEmail: '',
    inputDescription: '',
  };

  async componentDidMount() {
    this.setState({ loading: carregando });
    const result = await getUser();
    this.setState(
      {
        loading: 'off',
        inputName: result.name,
        inputEmail: result.email,
        inputDescription: result.description,
      },
    );
  }

  updatingUser = async () => {
    const { inputName, inputEmail, inputDescription } = this.state;
    if (
      inputName.length > 0
      && inputEmail.length > 0
      && inputDescription.length > 0
    ) {
      this.setState({ buttonDisabled: false });
    }
    await updateUser(
      { name: inputName,
        email: inputEmail,
        description: inputDescription,
      },
    );
  }

  onChangeHandler = async ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.updatingUser);
  }

  showProfile() {
    const { loading } = this.state;
    if (loading === 'off') {
      const { buttonDisabled } = this.state;
      const { inputName, inputEmail, inputDescription } = this.state;
      return (
        <div data-testid="page-profile-edit">
          <form id="profile-edit-form" autoComplete="off">
            <div id="image-div">
              <img id="profile-img" data-testid="profile-image" src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="" />
            </div>
            <div id="inputs-div">
              <label className="labels" htmlFor="input-name">
                Nome:
                <input
                  id="input-name"
                  type="text"
                  name="inputName"
                  data-testid="edit-input-name"
                  onChange={ this.onChangeHandler }
                  value={ inputName }
                />
              </label>
              <label className="labels" htmlFor="input-email">
                E-mail:
                <input
                  id="input-email"
                  type="email"
                  name="inputEmail"
                  data-testid="edit-input-email"
                  onChange={ this.onChangeHandler }
                  value={ inputEmail }
                />
              </label>
              <label className="labels" htmlFor="input-description">
                Descrição:
                <input
                  id="input-description"
                  type="text"
                  name="inputDescription"
                  data-testid="edit-input-description"
                  onChange={ this.onChangeHandler }
                  value={ inputDescription }
                />
              </label>
            </div>
            <div id="link-div">
              <Link
                to="/profile"
              >
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ buttonDisabled }
                  onClick={ this.onClickHanlder }
                >
                  Salvar
                </button>
              </Link>
            </div>
          </form>
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

export default ProfileEdit;
