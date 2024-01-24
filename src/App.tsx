import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

import classes from 'src/styles/app.module.scss';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <div className={classes.app_container}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
