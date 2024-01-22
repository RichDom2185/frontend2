import { routes } from './routes';
import classes from './styles/app.module.scss';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import '@blueprintjs/core/lib/css/blueprint.css';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <div className={classNames(Classes.DARK, classes.app_container)}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
