import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { WindowChrome } from './controls';
import { StoreState } from './store';

export const content = (store: Store<StoreState>) => (
  <StrictMode>
    <Provider store={store}>
      <WindowChrome>
        <div>CONTENT</div>
      </WindowChrome>
    </Provider>
  </StrictMode>
);
