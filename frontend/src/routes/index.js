import React from 'react';

import { Switch } from 'react-router-dom';

import Private from './private';
import Guest from './guest';

import Signin from '../pages/Signin';

import Orders from '../pages/Orders';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Dashboard from '../pages/Dashboard';

const Routes = () => (
  <Switch>
    <Guest exact path="/" component={Signin} />

    <Private exact path="/orders" component={Orders} />
    <Private exact path="/products" component={Products} />
    <Private exact path="/users" component={Users} />
    <Private exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
