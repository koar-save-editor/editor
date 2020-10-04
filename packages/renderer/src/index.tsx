import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { WindowChrome } from './controls';
import { createStore } from './store';

const store = await createStore();

render(
  <StrictMode>
    <Provider store={store}>
      <WindowChrome></WindowChrome>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
