import React, { Fragment } from 'react';

import Header from '../../components/Header';
import { Container } from './styles';

const Dashboard = () => (
  <Fragment>
    <Header />
    <Container>
      <h1>Olá ! Seja bem vindo!</h1>
    </Container>
  </Fragment>
);

export default Dashboard;
