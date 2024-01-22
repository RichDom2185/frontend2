import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  { path: '/playground', lazy: () => import('../pages/Playground') },
];
