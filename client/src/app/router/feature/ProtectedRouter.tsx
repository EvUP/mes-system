import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouterProps = {
  isAllowed: boolean;
  redirectTo: string;
};

export default function ProtectedRouter({ isAllowed, redirectTo }: ProtectedRouterProps): React.JSX.Element {
  if (!isAllowed) return <Navigate to={redirectTo} />;
  return <Outlet />;
}
