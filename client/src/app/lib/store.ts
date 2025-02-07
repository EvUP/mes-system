import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../entities/user/model/authSlice';
import ordersReducer from '../../entities/orders/model/ordersSlice';
import equipmentReducer from '../../entities/equipment/model/equipmentSlice';

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