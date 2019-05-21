import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  orderCreateRequest: ['data'],
  orderCreateSuccess: ['id'],

  orderListRequest: null,
  orderListSuccess: ['orders'],

  orderDeleteRequest: ['id'],
  orderDeleteSuccess: ['id'],

  orderHandleDescription: ['description'],
  orderHandleProductId: ['productId'],
  orderHandleAmount: ['amount'],
});

export const OrderTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  orders: [],
  order: {
    id: '',
    description: '',
    productId: '',
    amount: 0,
  },
  message: '',
});

/* Reducers */

export const createSuccess = state => state.merge({
  order: {
    id: '',
    description: '',
    productId: '',
    amount: 0,
  },
  message: 'Pedido inserido com sucesso!',
});
export const updateSuccess = state => state.merge({
  order: {
    id: '',
    description: '',
    productId: '',
    amount: 0,
  },
  message: 'Pedido atualizado com sucesso!',
});
export const listSuccess = (state, data) => state.merge({ orders: data.orders });
export const deleteSuccess = (state, { id }) => state.merge({ orders: state.orders.filter(order => order.id !== id), message: 'teste' });

export const handleDescription = (state, { description }) => state.merge({
  order: {
    id: state.order.id,
    description,
    productId: state.order.productId,
    amount: state.order.amount,
  },
});
export const handleProductId = (state, { productId }) => state.merge({
  order: {
    id: state.order.id,
    description: state.order.description,
    productId,
    amount: state.order.amount,
  },
});
export const handleAmount = (state, { amount }) => state.merge({
  order: {
    id: state.order.id,
    description: state.order.description,
    productId: state.order.productId,
    amount,
  },
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_CREATE_SUCCESS]: createSuccess,
  [Types.ORDER_LIST_SUCCESS]: listSuccess,
  [Types.ORDER_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_HANDLE_DESCRIPTION]: handleDescription,
  [Types.ORDER_HANDLE_PRODUCT_ID]: handleProductId,
  [Types.ORDER_HANDLE_AMOUNT]: handleAmount,
});
