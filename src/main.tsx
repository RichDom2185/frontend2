import App from './App.tsx';
import { store } from './store/index.ts';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'src/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
