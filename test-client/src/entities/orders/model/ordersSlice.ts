import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '../api/orders.service';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ page, limit }: { page: number; limit: number }) => {
    return ordersService.getOrders(page, limit);
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: number; status: string }) => {
    return ordersService.updateOrderStatus(id, status);
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], loading: false, error: null as string | null, page: 1 },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
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

export const { setPage } = ordersSlice.actions;

export default ordersSlice.reducer;