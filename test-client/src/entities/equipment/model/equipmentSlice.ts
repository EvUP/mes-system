import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import equipmentService from '../api/equipment.service';

export const fetchEquipment = createAsyncThunk('equipment/fetchEquipment', async () => {
  return equipmentService.getEquipment();
});

export const updateEquipmentStatus = createAsyncThunk(
  'equipment/updateStatus',
  async ({ id, status }: { id: number; status: string }) => {
    return equipmentService.updateEquipmentStatus(id, status);
  },
);

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: { list: [], loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEquipment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEquipment.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchEquipment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Ошибка загрузки';
    });
  },
});

export default equipmentSlice.reducer;
