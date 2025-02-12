import { z } from 'zod';

export const equipmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(['Работает', 'Остановлено', 'Техническое обслуживание']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const equipmentListSchema = z.array(equipmentSchema);
