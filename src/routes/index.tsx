import { Navigate, RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  { path: '/playground', lazy: () => import('../pages/Playground') },
  { path: '/sicp', lazy: () => import('../pages/Sicp') },
  { path: '/sicp/:chapter', lazy: () => import('../pages/Sicp') },
  { path: '*', element: <Navigate to="/playground" replace /> },
];
