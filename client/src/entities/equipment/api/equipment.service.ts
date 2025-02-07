import axiosInstance from '../../../shared/api/axiosInstance';

class EquipmentService {
  async getEquipment() {
    const response = await axiosInstance.get('/equipment');
    return response.data;
  }

  async updateEquipmentStatus(id: number, status: string) {
    const response = await axiosInstance.put(`/equipment/${id}`, { status });
    return response.data;
  }
}

export default new EquipmentService();
