import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  userCreateRequest: ['data'],
  userCreateSuccess: ['id'],

  userUpdateRequest: ['data'],
  userUpdateSuccess: ['id'],

  userListRequest: null,
  userListSuccess: ['users'],

  userDeleteRequest: ['id'],
  userDeleteSuccess: ['id'],

  userSelectedRequest: ['id'],
  userSelectedSuccess: ['user'],

  userHandleName: ['name'],
  userHandleUsername: ['username'],
  userHandlePassword: ['password'],

  userClear: null,
});

export const UserTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  users: [],
  user: {
    id: '',
    name: '',
    username: '',
    password: '',
    oldPassword: '',
  },
  message: '',
});

/* Reducers */

export const createSuccess = state => state.merge({
  user: {
    id: '',
    name: '',
    username: '',
    password: '',
    oldPassword: '',
  },
  message: 'Usuário inserido com sucesso!',
});
export const updateSuccess = state => state.merge({
  user: {
    id: '',
    name: '',
    username: '',
    password: '',
    oldPassword: '',
  },
  message: 'Usuário atualizado com sucesso!',
});
export const listSuccess = (state, data) => state.merge({ users: data.users });
export const deleteSuccess = (state, { id }) => state.merge({ users: state.users.filter(user => user.id !== id), message: 'teste' });
export const selectedSuccess = (state, { user }) => state.merge({
  user: {
    id: user.id,
    name: user.name,
    username: user.username,
    password: '',
    oldPassword: user.password,
  },
});
export const handleName = (state, { name }) => state.merge({
  user: {
    id: state.user.id,
    name,
    username: state.user.username,
    password: state.user.password,
    oldPassword: state.user.password,
  },
});
export const handleUserName = (state, { username }) => state.merge({
  user: {
    id: state.user.id,
    name: state.user.name,
    username,
    password: state.user.password,
    oldPassword: state.user.password,
  },
});
export const handlePassword = (state, { password }) => state.merge({
  user: {
    id: state.user.id,
    name: state.user.name,
    username: state.user.username,
    password,
    oldPassword: state.user.password,
  },
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_CREATE_SUCCESS]: createSuccess,
  [Types.USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_LIST_SUCCESS]: listSuccess,
  [Types.USER_DELETE_SUCCESS]: deleteSuccess,
  [Types.USER_SELECTED_SUCCESS]: selectedSuccess,

  [Types.USER_HANDLE_NAME]: handleName,
  [Types.USER_HANDLE_USERNAME]: handleUserName,
  [Types.USER_HANDLE_PASSWORD]: handlePassword,
});
