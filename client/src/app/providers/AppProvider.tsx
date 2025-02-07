import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function AppProvider({
  children,
}: {
  children: React.JSX.Element;
}): React.JSX.Element {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
}
