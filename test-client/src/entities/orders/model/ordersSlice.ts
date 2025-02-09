import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '../api';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return ordersService.getOrders();
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: number; status: string }) => {
    return ordersService.updateOrderStatus(id, status);
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка загрузки';
    });
  },
});

export default ordersSlice.reducer;
