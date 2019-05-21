import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OrdersCreators from '../../store/ducks/order';
import ProductCreators from '../../store/ducks/product';
import Header from '../../components/Header';
import {
  Container, Form, Table, TableRows, ExcludeButton,
} from './styles';

class Orders extends Component {
  static propTypes = {
    orderCreateRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { orderListRequest, productListRequest, products } = this.props;
    orderListRequest();
    productListRequest();
  }

  selectedOrder = async (orderId) => {
    const { orderSelectedRequest } = this.props;
    orderSelectedRequest(orderId);
  };

  handleOrder = (event) => {
    event.preventDefault();
    const { order, products, orderCreateRequest } = this.props;
    let product = [];
    if (order.productId) {
      product = products.filter(prod => prod.id.toString() === order.productId);
    } else {
      product[0] = products[0];
    }

    const total = product[0].price * order.amount;
    const userId = localStorage.getItem('@User:id');
    const newOrder = {
      user_id: userId,
      description: order.description,
      total,
      products: {
        [product[0].id]: { amount: order.amount },
      },
    };

    orderCreateRequest(newOrder);
  };

  render() {
    const {
      products,
      orders,
      order,
      orderDeleteRequest,
      orderHandleProductId,
      orderHandleDescription,
      orderHandleAmount,
    } = this.props;

    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Cadastro de Pedidos</h1>
          <Form onSubmit={this.handleOrder}>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                id="description"
                value={order.description}
                placeholder="Descrição"
                onChange={e => orderHandleDescription(e.target.value)}
                required
              />
            </label>
            <label htmlFor="amount">
              Quantidade
              <input
                type="number"
                id="amount"
                value={order.amount}
                placeholder="Descrição"
                onChange={e => orderHandleAmount(e.target.value)}
                required
              />
            </label>
            Pedidos
            <select id="products" selected onChange={e => orderHandleProductId(e.target.value)}>
              {products
                ? products.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))
                : 'Não existem produtos'}
            </select>
            <button type="submit">
              <span>dicionar novo pedido</span>
            </button>
          </Form>
          <Table>
            <thead>
              <TableRows>
                <th>ID</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Total</th>
                <th>Produtos</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {orders
                ? orders.map(order => (
                  <TableRows key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.description}</td>
                    <td>{order.status}</td>
                    <td>{order.total}</td>
                    <td />
                    <td>
                      <ExcludeButton
                        type="button"
                        onClick={() => {
                          orderDeleteRequest(order.id);
                        }}
                      >
                          Excluir
                      </ExcludeButton>
                    </td>
                  </TableRows>
                ))
                : 'Pedidos não encontrado!'}
            </tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  order: state.order.order,
  name: state.order.name,
  description: state.order.description,
  products: state.product.products,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...OrdersCreators, ...ProductCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
