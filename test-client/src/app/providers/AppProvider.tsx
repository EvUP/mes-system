import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { queryClient } from '../lib/queryClient'; 
import { theme } from '../lib/theme'; 

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<CircularProgress />}>
            {children}
          </Suspense>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
