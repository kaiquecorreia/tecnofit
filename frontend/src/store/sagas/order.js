import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';

import OrderActions from '../ducks/order';

export function* orderList() {
  try {
    const response = yield call(api.get, '/orders');
    const ordersArray = Object.values(response.data);
    yield put(OrderActions.orderListSuccess(ordersArray));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao buscar pedidos',
        message: 'Não foi possível encontrar os pedido',
      }),
    );
  }
}

export function* orderCreate({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, '/orders', data);

    yield put(OrderActions.orderCreateSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: 'O pedido foi criado com sucesso!',
      }),
    );
    yield put(push('/dashboard'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao inserir novo pedido',
        message: error.response.data.message,
      }),
    );
  }
}

export function* orderDelete(data) {
  yield put(toastrActions.clean());
  try {
    yield call(api.delete, '/orders', { data });
    yield put(OrderActions.orderDeleteSuccess(data.id));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: 'O pedido foi deletado com sucesso!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao deletar o pedido',
        message: 'teste',
      }),
    );
  }
}
