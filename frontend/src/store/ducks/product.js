import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  productCreateRequest: ['data'],
  productCreateSuccess: ['id'],

  productUpdateRequest: ['data'],
  productUpdateSuccess: ['id'],

  productListRequest: null,
  productListSuccess: ['products'],

  productDeleteRequest: ['id'],
  productDeleteSuccess: ['id'],

  productSelectedRequest: ['id'],
  productSelectedSuccess: ['product'],

  productHandleName: ['name'],
  productHandleDescription: ['description'],
  productHandlePrice: ['price'],
  productHandleSku: ['sku'],
  productHandleStock: ['stock'],
});

export const ProductTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  products: [],
  product: {
    id: '',
    name: '',
    description: '',
    price: '',
    sku: '',
    stock: '',
  },
  message: '',
});

/* Reducers */

export const createSuccess = state => state.merge({
  product: {
    id: '',
    name: '',
    description: '',
    price: '',
    sku: '',
    stock: '',
  },
  message: 'Produto inserido com sucesso!',
});
export const updateSuccess = state => state.merge({
  product: {
    id: '',
    name: '',
    description: '',
    price: '',
    sku: '',
    stock: '',
  },
  message: 'Produto atualizado com sucesso!',
});
export const listSuccess = (state, data) => state.merge({ products: data.products });
export const deleteSuccess = (state, { id }) => state.merge({
  products: state.products.filter(product => product.id !== id),
  message: 'Deletado com sucesso!',
});
export const selectedSuccess = (state, { product }) => state.merge({
  product,
});
export const handleName = (state, { name }) => state.merge({
  product: {
    id: state.product.id,
    name,
    description: state.product.description,
    price: state.product.price,
    sku: state.product.sku,
    stock: state.product.stock,
  },
});
export const handleDescription = (state, { description }) => state.merge({
  product: {
    id: state.product.id,
    name: state.product.name,
    description,
    price: state.product.price,
    sku: state.product.sku,
    stock: state.product.stock,
  },
});
export const handlePrice = (state, { price }) => state.merge({
  product: {
    id: state.product.id,
    name: state.product.name,
    description: state.product.description,
    price,
    sku: state.product.sku,
    stock: state.product.stock,
  },
});
export const handleSku = (state, { sku }) => state.merge({
  product: {
    id: state.product.id,
    name: state.product.name,
    description: state.product.description,
    price: state.product.price,
    sku,
    stock: state.product.stock,
  },
});
export const handleStock = (state, { stock }) => state.merge({
  product: {
    id: state.product.id,
    name: state.product.name,
    description: state.product.description,
    price: state.product.price,
    sku: state.product.sku,
    stock,
  },
});

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCT_CREATE_SUCCESS]: createSuccess,
  [Types.PRODUCT_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCT_LIST_SUCCESS]: listSuccess,
  [Types.PRODUCT_DELETE_SUCCESS]: deleteSuccess,
  [Types.PRODUCT_SELECTED_SUCCESS]: selectedSuccess,

  [Types.PRODUCT_HANDLE_NAME]: handleName,
  [Types.PRODUCT_HANDLE_DESCRIPTION]: handleDescription,
  [Types.PRODUCT_HANDLE_PRICE]: handlePrice,
  [Types.PRODUCT_HANDLE_SKU]: handleSku,
  [Types.PRODUCT_HANDLE_STOCK]: handleStock,
});
