import { all, takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../ducks/auth';
import { UserTypes } from '../ducks/user';
import { ProductTypes } from '../ducks/product';
import { OrderTypes } from '../ducks/order';

import { getSignin, getSignOut } from './auth';

import {
  userCreate, userList, userDelete, userSelected, userUpdate,
} from './user';

import {
  productCreate,
  productList,
  productDelete,
  productSelected,
  productUpdate,
} from './product';

import {
  orderCreate, orderList, orderDelete, orderSelected,
} from './order';

export default function* rootSaga() {
  yield all([
    takeLatest(AuthTypes.SIGNIN_REQUEST, getSignin),
    takeLatest(AuthTypes.SIGN_OUT, getSignOut),
    takeLatest(UserTypes.USER_CREATE_REQUEST, userCreate),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, userUpdate),
    takeLatest(UserTypes.USER_LIST_REQUEST, userList),
    takeLatest(UserTypes.USER_DELETE_REQUEST, userDelete),
    takeLatest(UserTypes.USER_SELECTED_REQUEST, userSelected),
    takeLatest(ProductTypes.PRODUCT_CREATE_REQUEST, productCreate),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, productUpdate),
    takeLatest(ProductTypes.PRODUCT_LIST_REQUEST, productList),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, productDelete),
    takeLatest(ProductTypes.PRODUCT_SELECTED_REQUEST, productSelected),
    takeLatest(OrderTypes.ORDER_CREATE_REQUEST, orderCreate),
    takeLatest(OrderTypes.ORDER_LIST_REQUEST, orderList),
    takeLatest(OrderTypes.ORDER_DELETE_REQUEST, orderDelete),
  ]);
}
