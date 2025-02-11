import { axiosInstance } from '../../../shared/api';

class OrdersService {
  async getOrders(page: number = 1, limit: number = 10) {
    const response = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
    return response.data;
  }

  async updateOrderStatus(id: number, status: string) {
    const response = await axiosInstance.put(`/orders/${id}`, { status });
    return response.data;
  }
}

export const ordersService = new OrdersService();
