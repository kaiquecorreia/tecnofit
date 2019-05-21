import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastr } from 'react-redux-toastr';

import { reducer as auth } from './auth';
import { reducer as user } from './user';
import { reducer as product } from './product';
import { reducer as order } from './order';

export default history => combineReducers({
  auth,
  user,
  product,
  order,
  toastr,
  router: connectRouter(history),
});
