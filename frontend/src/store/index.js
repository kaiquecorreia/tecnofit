import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import history from '../routes/history';
import sagas from './sagas';
import reducers from './ducks';

const middlewares = [routerMiddleware(history)];

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);

const tronMiddleware =
  process.env.NODE_ENV === 'development'
    ? console.tron.createEnhancer
    : () => {};

const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(...middlewares),
    tronMiddleware(),
  ),
);

sagaMiddleware.run(sagas);

export default store;
