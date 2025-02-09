import { configureStore } from '@reduxjs/toolkit';
import { authReducer, ordersReducer, equipmentReducer } from '../../entities';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    equipment: equipmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
