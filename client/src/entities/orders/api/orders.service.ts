import axiosInstance from '../../../shared/api/axiosInstance';

class OrdersService {
  async getOrders() {
    const response = await axiosInstance.get('/orders');
    return response.data;
  }

  async updateOrderStatus(id: number, status: string) {
    const response = await axiosInstance.put(`/orders/${id}`, { status });
    return response.data;
  }
}

export default new OrdersService();
