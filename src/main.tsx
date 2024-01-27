import App from './App.tsx';
import { store } from './store/index.ts';
import { createInBrowserFileSystem } from './utils/fileSystem/createInBrowserFileSystem.ts';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'src/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root')!);

createInBrowserFileSystem(store)
  .catch(err => console.error(err))
  .finally(() => {
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });
