import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthCreators from '../../store/ducks/auth';

import { Container } from './styles';

class Header extends Component {
  componentDidMount() {}

  signOut = async () => {
    // const { signOut } = this.props;
    await localStorage.clear();
    // signOut();
  };

  render() {
    return (
      <Container>
        <ul>
          <li>
            <Link to="/orders">Pedidos</Link>
          </li>
          <li>
            <Link to="/products">Produtos</Link>
          </li>
          <li>
            <Link to="/users">Usuários</Link>
          </li>
          <li>
            <Link to="/" onClick={this.signOut}>
              Sair
            </Link>
          </li>
        </ul>
      </Container>
    );
  }
}
// export default Header;
const mapStateToProps = state => ({
  signin: state.auth.signin,
});

const mapDispatchToProps = dispatch => bindActionCreators(AuthCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
