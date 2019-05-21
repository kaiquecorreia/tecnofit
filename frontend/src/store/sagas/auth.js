import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import AuthActions from '../ducks/auth';

export function* getSignin({ username, password }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, '/signIn', { username, password });
    localStorage.setItem('@User:id', response.data.id);
    yield put(AuthActions.signinSuccess(response.data));
    yield put(push('/orders'));

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: 'Seja Bem-vindo!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha na autenticação',
        message: error.response.data.message,
      }),
    );
  }
}
