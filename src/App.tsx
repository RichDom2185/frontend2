import { routes } from './routes';
import Constants from './utils/constants';
import { useDetectKeyboard } from './utils/hooks';
import { createBrowserRouter, RouterProvider } from 'react-router';

import classes from 'src/styles/app.module.scss';

const router = createBrowserRouter(routes, {
  basename: Constants.baseUrl,
});

const App: React.FC = () => {
  const { styles } = useDetectKeyboard();
  return (
    <div className={classes.app_container} style={styles}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
