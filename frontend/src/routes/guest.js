import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import store from '../store';

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!store.getState().auth.signin ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/orders', state: { from: props.location } }} />
    ))
    }
  />
);

export default GuestRoute;
