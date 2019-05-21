import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthActions from '../../store/ducks/auth';

import { Container, Form } from './styles';

class Signin extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
  };

  propTypes = {
    signinRequest: PropTypes.func.isRequired,
  };

  getSignin = (event) => {
    event.preventDefault();
    const { usernameInput, passwordInput } = this.state;
    const { signinRequest } = this.props;
    signinRequest(usernameInput, passwordInput);
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.getSignin}>
          <label htmlFor="username">
            Usuário
            <input
              type="text"
              id="username"
              placeholder="Digite seu nome de usuário"
              onChange={e => this.setState({ usernameInput: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="password"
              id="password"
              placeholder="Sua senha secreta"
              onChange={e => this.setState({ passwordInput: e.target.value })}
            />
          </label>
          <button type="submit">Entrar</button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signin);
