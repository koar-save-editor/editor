import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './store';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(() => {});
sagaMiddleware.run(rootSaga);

render(
  <StrictMode>
    <Provider store={store}></Provider>
  </StrictMode>,
  document.getElementById('root')
);
