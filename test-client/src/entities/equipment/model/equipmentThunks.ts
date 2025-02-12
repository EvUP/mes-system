import { createAsyncThunk } from '@reduxjs/toolkit';
import equipmentService from '../api/equipment.service';
import type { EquipmentT } from './types';

export const fetchEquipment = createAsyncThunk<EquipmentT[]>(
  'equipment/fetchEquipment',
  async () => {
    return equipmentService.getEquipment();
  },
);

export const updateEquipmentStatus = createAsyncThunk<
  EquipmentT,
  { id: number; status: string }
>('equipment/updateStatus', async ({ id, status }) => {
  return equipmentService.updateEquipmentStatus(id, status);
});
