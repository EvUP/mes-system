import { createSlice } from '@reduxjs/toolkit';
import { fetchEquipment, updateEquipmentStatus } from './equipmentThunks';
import type { EquipmentSliceT } from './types';

const initialState: EquipmentSliceT = {
  list: [],
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
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

    builder.addCase(updateEquipmentStatus.fulfilled, (state, action) => {
      state.list = state.list.map((equipment) =>
        equipment.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() } 
          : equipment
      );
    });
    
  },
});

export default equipmentSlice.reducer;
