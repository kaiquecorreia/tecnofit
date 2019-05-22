import React, { Component, Fragment } from 'react';
import CurrencyInput from 'react-currency-input';
import formatCurrency from 'format-currency';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductsCreators from '../../store/ducks/product';
import Header from '../../components/Header';
import { Container, Form, Table, TableRows, ExcludeButton, EditButton, FormLabel } from './styles';

class Products extends Component {
  static propTypes = {
    productCreateRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { productListRequest } = this.props;

    productListRequest();
  }

  selectedProduct = async productId => {
    const { productSelectedRequest } = this.props;
    productSelectedRequest(productId);
  };

  handleProduct = event => {
    event.preventDefault();
    const { product, productListRequest } = this.props;
    if (!product.id) {
      const { productCreateRequest } = this.props;
      productCreateRequest(product);
    } else {
      const { productUpdateRequest } = this.props;
      productUpdateRequest(product);
    }
  };

  render() {
    const {
      products,
      product,
      productDeleteRequest,
      productHandleName,
      productHandleDescription,
      productHandlePrice,
      productHandleSku,
      productHandleStock,
    } = this.props;
    const opts = { format: '%s%v', symbol: 'R$ ', locale: 'de-DE' };
    return (
      <Fragment>
        <Header />
        <Container>
          <h1>Cadastro de Produtos</h1>
          <Form onSubmit={this.handleProduct}>
            <FormLabel>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  id="name"
                  value={product.name}
                  placeholder="Nome do produto"
                  onChange={e => productHandleName(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  id="description"
                  value={product.description}
                  placeholder="Descrição"
                  onChange={e => productHandleDescription(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="price">
                Preço
                <CurrencyInput
                  id="price"
                  value={product.price}
                  decimalSeparator=","
                  thousandSeparator="."
                  onChangeEvent={(e, m, floatvalue) => productHandlePrice(floatvalue)}
                />
              </label>
              <label htmlFor="sku">
                SKU
                <input
                  type="text"
                  id="sku"
                  value={product.sku}
                  placeholder="SKU do produto"
                  onChange={e => productHandleSku(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="stock">
                Estoque
                <input
                  type="number"
                  id="stock"
                  value={product.stock}
                  placeholder="Estoque do produto"
                  onChange={e => productHandleStock(e.target.value)}
                  required
                />
              </label>
            </FormLabel>

            <button type="submit">
              <span>{product.id ? 'Editar produto' : 'Adicionar novo produto'}</span>
            </button>
          </Form>
          <Table>
            <thead>
              <TableRows>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>SKU</th>
                <th>Estoque</th>
                <th>Ações</th>
              </TableRows>
            </thead>
            <tbody>
              {products
                ? products.map(product => (
                    <TableRows key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{formatCurrency(product.price, opts)}</td>
                      <td>{product.sku}</td>
                      <td>{product.stock}</td>
                      <td>
                        <EditButton type="button" onClick={() => this.selectedProduct(product.id)}>
                          Editar
                        </EditButton>
                        <ExcludeButton
                          type="button"
                          onClick={() => {
                            productDeleteRequest(product.id);
                          }}
                        >
                          Excluir
                        </ExcludeButton>
                      </td>
                    </TableRows>
                  ))
                : 'Produto não encontrado!'}
            </tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  product: state.product.product,
  name: state.product.name,
  description: state.product.description,
  price: state.product.price,
  sku: state.product.sku,
  stock: state.product.stock,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProductsCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
// export default products;
