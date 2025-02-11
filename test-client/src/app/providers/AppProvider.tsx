import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid/locales';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({}, ruRU);

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
