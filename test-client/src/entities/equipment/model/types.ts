import type { z } from 'zod';
import type { equipmentSchema } from './schema';

export type EquipmentT = z.infer<typeof equipmentSchema>;

export type EquipmentSliceT = {
  list: EquipmentT[];
  loading: boolean;
  error: string | null;
};
