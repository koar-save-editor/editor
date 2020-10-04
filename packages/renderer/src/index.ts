import { render } from 'react-dom';
import * as page from './page';
import { createStore } from './store';

async function main() {
  const store = await createStore();
  render(page.content(store), document.getElementById('root'));
}

main();
