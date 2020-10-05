import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { WindowChrome } from './controls';
import { App } from './controls/app';
import { createStore } from './store';

import './styles/main.scss';

async function main() {
  render(
    <StrictMode>
      <Provider store={await createStore()}>
        <WindowChrome>
          <App />
        </WindowChrome>
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  );
}

main();
