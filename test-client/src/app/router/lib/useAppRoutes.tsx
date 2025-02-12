import { lazy } from 'react';
import Layout from '../../layout/Layout';
import { GardLoader } from '../../layout/GardLoader';
import ErrorPage from '../../../pages/ErrorPage'; 

const OrdersPage = lazy(() => import('../../../pages/Orders'));
const EquipmentPage = lazy(() => import('../../../pages/Equipment'));
const LoginPage = lazy(() => import('../../../pages/Login'));

export const router = [
  {
    loader: GardLoader,
    element: <Layout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: '/equipment', element: <EquipmentPage /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];
