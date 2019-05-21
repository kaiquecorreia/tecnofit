import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';

import history from './routes/history';
import './config/reactotron';
import store from './store';
import GlobalStyles from './styles/global';
import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <GlobalStyles />
      <Routes />
      <ReduxToastr />
    </ConnectedRouter>
  </Provider>
);

export default App;
