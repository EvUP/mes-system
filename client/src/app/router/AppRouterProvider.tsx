import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import useAppRoutes from './lib/useAppRoutes';
import { refreshThunk } from '../../entities/user/model/authThunks';

export default function AppRouterProvider(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => !!state.auth.user);
  useEffect(() => {
    void dispatch(refreshThunk());
  }, [dispatch]);

  const routes = useAppRoutes();

  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: '/',
        element: isUser ? <Navigate to="/orders" /> : <Navigate to="/login" />,
      },
      ...routes,
    ])} />
  );
}
