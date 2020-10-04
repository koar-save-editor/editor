import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Store,
  StoreEnhancer,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './reducers';
import defaultSaga from './sagas';
import { StoreState } from './shapes';

/**
 * Create the store.
 */
export default async function (): Promise<Store<StoreState>> {
  const sagaMiddleware = createSagaMiddleware();
  const middleware: Middleware[] = [sagaMiddleware];
  let enhance: (...enhancers: StoreEnhancer[]) => StoreEnhancer;
  if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = await import('remote-redux-devtools');
    enhance = composeWithDevTools({
      name: 'KoAR Save Editor',
      port: 9090,
      realtime: true,
    });
  } else {
    const { logger } = await import('redux-logger');
    middleware.push(logger);
    enhance = compose;
  }
  const store = createStore(
    combineReducers<StoreState>(reducers),
    enhance(applyMiddleware(...middleware))
  );
  sagaMiddleware.run(defaultSaga);
  return store;
}
