import { routes } from './routes';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import classes from 'src/styles/app.module.scss';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <div className={classNames(Classes.DARK, classes.app_container)}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
