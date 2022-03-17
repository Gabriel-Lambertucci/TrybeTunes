import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import '../Style/Login.css';

const tunesImg = require('../TrybeTunes.png');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      showButton: false,
      inputName: '',
      loggedIn: '',
    };
  }

  handleChange = ({ target }) => {
    const number = 3;
    const loginLength = target.value.length;
    this.setState({
      inputName: target.value,
    });
    if (loginLength >= number) {
      this.setState({
        showButton: true,
      });
    } else {
      this.setState({
        showButton: false,
      });
    }
  }

  handleClick = async () => {
    this.setState({
      loggedIn: false,
    });
    const { inputName } = this.state;
    await createUser({ name: inputName });
    this.setState({
      loggedIn: true,
    });
  }

  loadingFunction= () => {
    const { loggedIn } = this.state;
    const { showButton } = this.state;
    if (loggedIn === '') {
      const result = (
        <div className="login-container" data-testid="page-login">
          <h1>TrybeTunes</h1>
          <div className="login-image">
            <img
              src= { tunesImg }
              alt="TrybeTunes logo"
            />
          </div>
          <form autoComplete="off" className="login-input-button">
            <input
              id="login-input"
              onChange={ this.handleChange }
              data-testid="login-name-input"
              type="text"
              placeholder="Insira seu nome de usuário"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ !showButton }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      );
      return result;
    } if (loggedIn === false) {
      const result = (
        <h2 id="loading-h2">Carregando...</h2>
      );
      return result;
    } if (loggedIn === true) {
      const result = (
        <>
          <div className="login-container" data-testid="page-login">
            <h1>Bem vindo ao TrybeTunes!</h1>
            <div className="login-image">
              <img
                src={ tunesImg }
                alt="TrybeTunes logo"
              />
            </div>
            <div className="login-input-button">
              <input
                id="login-input"
                onChange={ this.handleChange }
                data-testid="login-name-input"
                type="text"
                placeholder="Insira seu nome de usuário"
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ !showButton }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </div>
          </div>
          <Redirect to="/search" />
        </>
      );
      return result;
    }
  }

  render() {
    console.log(tunesImg)
    return (
      this.loadingFunction()
    );
  }
}

export default Login;
