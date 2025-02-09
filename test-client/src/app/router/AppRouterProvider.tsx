import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './lib/useAppRoutes';

export default function AppRouterProvider(): React.JSX.Element {
  return <RouterProvider router={createBrowserRouter(router)} />;
}
