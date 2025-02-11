import React, { Suspense } from 'react';
import AppProvider from './providers/AppProvider';
import AppRouterProvider from './router/AppRouterProvider';

export default function App(): React.JSX.Element {
  return (
    <AppProvider>
      <Suspense fallback={<div>Загрузка приложения...</div>}>
        <AppRouterProvider />
      </Suspense>
    </AppProvider>
  );
}
