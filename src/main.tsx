import App from './App.tsx';
import { store } from './store';
import { createInBrowserFileSystem } from './utils/fileSystem/createInBrowserFileSystem.ts';
import { FocusStyleManager } from '@blueprintjs/core';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'src/styles/index.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const root = createRoot(document.getElementById('root')!);

createInBrowserFileSystem(store)
  .catch(err => console.error(err))
  .finally(() => {
    root.render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    );
  });
