import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';

import UserActions from '../ducks/user';

export function* userList() {
  try {
    const response = yield call(api.get, '/users');

    yield put(UserActions.userListSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao buscar usuários',
        message: 'Não foi possível encontrar os usuário',
      }),
    );
  }
}
export function* userSelected({ id }) {
  try {
    const response = yield call(api.get, `/users/${id}`);

    yield put(UserActions.userSelectedSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao buscar usuário',
        message: 'Não foi possível encontrar o usuário',
      }),
    );
  }
}
export function* userCreate({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, '/users', data);

    yield put(UserActions.userCreateSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: `O usuário ${data.name} foi criado com sucesso!`,
      }),
    );
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao inserir novo usuário',
        message: error.response.data.message,
      }),
    );
  }
}
export function* userUpdate({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.put, '/users', data);

    yield put(UserActions.userUpdateSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: `O usuário ${data.name} foi atualizado com sucesso!`,
      }),
    );
    yield put(push('/dashboard'));
  } catch (error) {
    console.log(error);
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao inserir novo usuário',
        message: error.response.data.message,
      }),
    );
  }
}
export function* userDelete(data) {
  yield put(toastrActions.clean());
  try {
    yield call(api.delete, '/users', { data });
    yield put(UserActions.userDeleteSuccess(data.id));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: 'O usuário foi deletado com sucesso!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao deletar o usuário',
        message: 'teste',
      }),
    );
  }
}
