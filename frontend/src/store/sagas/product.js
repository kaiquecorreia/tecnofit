import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import { push } from 'connected-react-router';
import api from '../../services/api';

import ProductActions from '../ducks/product';

export function* productList() {
  try {
    const response = yield call(api.get, '/products');

    yield put(ProductActions.productListSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao buscar produtos',
        message: 'Não foi possível encontrar os produto',
      }),
    );
  }
}
export function* productSelected({ id }) {
  try {
    const response = yield call(api.get, `/products/${id}`);

    yield put(ProductActions.productSelectedSuccess(response.data));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao buscar produto',
        message: 'Não foi possível encontrar o produto',
      }),
    );
  }
}
export function* productCreate({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.post, '/products', data);

    yield put(ProductActions.productCreateSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: `O produto ${data.name} foi criado com sucesso!`,
      }),
    );
    yield put(push('/orders'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao inserir novo produto',
        message: error.response.data.message,
      }),
    );
  }
}
export function* productUpdate({ data }) {
  yield put(toastrActions.clean());
  try {
    const response = yield call(api.put, '/products', data);

    yield put(ProductActions.productUpdateSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: `O produto ${data.name} foi atualizado com sucesso!`,
      }),
    );
    yield put(push('/orders'));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao inserir novo produto',
        message: error.response.data.message,
      }),
    );
  }
}
export function* productDelete(data) {
  yield put(toastrActions.clean());
  try {
    yield call(api.delete, '/products', { data });
    yield put(ProductActions.productDeleteSuccess(data.id));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Sucesso!',
        message: 'O produto foi deletado com sucesso!',
      }),
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao deletar o produto',
        message: 'teste',
      }),
    );
  }
}
