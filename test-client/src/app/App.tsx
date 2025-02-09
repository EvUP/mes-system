import React from 'react';
import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';

export default function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppRouterProvider />
    </AppProvider>
  );
}
