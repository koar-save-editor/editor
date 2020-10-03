import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Environment } from './contracts';
import * as reducers from './reducers';
import defaultSaga from './sagas';
import { StoreState } from './shapes';

/**
 * Create the store.
 */
export default function (): Store<StoreState> {
  const sagaMiddleware = createSagaMiddleware();
  const environment = (process.env.NODE_ENV || 'development') as Environment;
  const enhance = composeWithDevTools({
    name: `KoAR Save Editor${environment === 'development' ? ' (DEV)' : ''}`,
    port: 9090,
    realtime: environment === 'development',
  });
  const store = createStore(
    combineReducers<StoreState>(reducers),
    { attributes: { environment } },
    enhance(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(defaultSaga);
  return store;
}
