import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserCreators from '../../store/ducks/user';
import Header from '../../components/Header';
import {
  Container, Form, Table, TableRows, ExcludeButton, EditButton,
} from './styles';

class Users extends Component {
  static propTypes = {
    userCreateRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { userListRequest } = this.props;

    userListRequest();
  }

  selectedUser = async (userId) => {
    const { userSelectedRequest } = this.props;
    userSelectedRequest(userId);
  };

  handleUser = (event) => {
    event.preventDefault();
    const { user } = this.props;
    if (!user.id) {
      const { userCreateRequest } = this.props;
      userCreateRequest(user);
    } else {
      const { userUpdateRequest } = this.props;
      userUpdateRequest(user);
    }
  };

  render() {
    const {
      users,
      user,
      userDeleteRequest,
      userHandleName,
      userHandleUsername,
      userHandlePassword,
    } = this.props;

    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Cadastro de Usuários</h1>
          <Form onSubmit={this.handleUser}>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                value={user.name}
                placeholder="Digite seu nome"
                onChange={e => userHandleName(e.target.value)}
                required
              />
            </label>
            <label htmlFor="username">
              Usuário
              <input
                type="text"
                id="username"
                value={user.username}
                placeholder="Digite seu usuário"
                onChange={e => userHandleUsername(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password">
              Senha
              <input
                type="text"
                id="password"
                value={user.password}
                placeholder="Sua senha secreta"
                onChange={e => userHandlePassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">
              <span>{user.id ? 'Editar usuário' : 'Adicionar novo usuário'}</span>
            </button>
          </Form>
          <Table>
            <thead>
              <TableRows>
                <th>ID</th>
                <th>Nome</th>
                <th>Usuário</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {users
                ? users.map(user => (
                  <TableRows key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>
                      <EditButton type="button" onClick={() => this.selectedUser(user.id)}>
                          Editar
                      </EditButton>
                      <ExcludeButton
                        type="button"
                        onClick={() => {
                          userDeleteRequest(user.id);
                        }}
                      >
                          Excluir
                      </ExcludeButton>
                    </td>
                  </TableRows>
                ))
                : 'Usuário não encontrado!'}
            </tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.users,
  user: state.user.user,
  name: state.user.name,
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
// export default Users;
