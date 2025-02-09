import Layout from '../../layout/Layout';
import OrdersPage from '../../../pages/Orders/OrdersPage';
import EquipmentPage from '../../../pages/Equipment/EquipmentPage';
import LoginPage from '../../../pages/Login/LoginPage';
import { GardLoader } from '../../layout/GardLoader';

export const router = [
  {
    loader: GardLoader,
    element: <Layout />,
    path: '',
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/equipment',
        element: <EquipmentPage />,
      },
    ],
  },
];
