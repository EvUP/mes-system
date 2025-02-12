import { axiosInstance } from '../../../shared/api';
import type { EquipmentT } from '../model/types';
import { equipmentListSchema } from '../model/schema';

class EquipmentService {
  async getEquipment(): Promise<EquipmentT[]> {
    const response = await axiosInstance.get('/equipment');
    return equipmentListSchema.parse(response.data);
  }

  async updateEquipmentStatus(id: number, status: string) {
    const response = await axiosInstance.put(`/equipment/${id}`, {
      status,
      updatedAt: new Date().toISOString(), 
    });
    return response.data;
  }
  
}

export default new EquipmentService();
