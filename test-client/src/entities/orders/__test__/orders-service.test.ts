import axiosInstance from '../../../shared/api/axiosInstance';
import { ordersService } from '../api/orders.service';

jest.mock('../../../shared/api/axiosInstance');

describe('OrdersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getOrders должен делать GET-запрос на /orders', async () => {
    const mockData = [{ id: 1, productName: 'Деталь A' }];
    const axiosGetMock = jest.mocked(axiosInstance.get);
    axiosGetMock.mockResolvedValueOnce({ data: mockData });

    const result = await ordersService.getOrders();

    expect(axiosGetMock).toHaveBeenCalledTimes(1);
    expect(axiosGetMock).toHaveBeenCalledWith('/orders');
    expect(result).toEqual(mockData);
  });

  test('updateOrderStatus должен делать PUT-запрос на /orders/:id', async () => {
    const mockData = { id: 1, status: 'Завершено' };
    const axiosPutMock = jest.mocked(axiosInstance.put);
    axiosPutMock.mockResolvedValueOnce({ data: mockData });

    const result = await ordersService.updateOrderStatus(1, 'Завершено');

    expect(axiosPutMock).toHaveBeenCalledTimes(1);
    expect(axiosPutMock).toHaveBeenCalledWith('/orders/1', { status: 'Завершено' });
    expect(result).toEqual(mockData);
  });

  test('getOrders должен выбрасывать ошибку при неудачном запросе', async () => {
    const errorMessage = 'Ошибка сети';
    const axiosGetMock = jest.mocked(axiosInstance.get);
    axiosGetMock.mockRejectedValueOnce(new Error(errorMessage));

    await expect(ordersService.getOrders()).rejects.toThrow(errorMessage);
    expect(axiosGetMock).toHaveBeenCalledTimes(1);
  });
});
