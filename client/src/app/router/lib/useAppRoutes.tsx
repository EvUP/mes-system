import { Navigate, type RouteObject } from 'react-router-dom';
import Layout from '../../layout/Layout';
import OrdersPage from '../../../pages/Orders/OrdersPage';
import EquipmentPage from '../../../pages/Equipment/EquipmentPage';
import ProtectedRouter from '../feature/ProtectedRouter';
import LoginPage from '../../../pages/Login/LoginPage';
import { useAppSelector } from '../../../shared/lib/hooks';

export default function useAppRoutes(): RouteObject[] {
  const isUser = useAppSelector((state) => !!state.auth.user);

  return [
    {
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: isUser ? <Navigate to="/orders" /> : <LoginPage />,
        },
        {
          element: <ProtectedRouter isAllowed={isUser} redirectTo="/login" />,
          children: [
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
      ],
    },
  ];
}
