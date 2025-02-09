import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ruRU } from '@mui/x-data-grid/locales';

const theme = createTheme({}, ruRU);

export default function AppProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
