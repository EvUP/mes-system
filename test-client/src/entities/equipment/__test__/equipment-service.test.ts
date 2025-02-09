import axiosInstance from '../../../shared/api/axiosInstance';
import EquipmentService from '../../equipment/api/equipment.service';

jest.mock('../../../shared/api/axiosInstance');

describe('EquipmentService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getEquipment должен делать GET-запрос на /equipment', async () => {
        const mockData = [{ id: 1, name: 'Оборудование A' }];
        const axiosGetMock = jest.mocked(axiosInstance.get);
        axiosGetMock.mockResolvedValueOnce({ data: mockData });

        const result = await EquipmentService.getEquipment();

        expect(axiosGetMock).toHaveBeenCalledTimes(1);
        expect(axiosGetMock).toHaveBeenCalledWith('/equipment');
        expect(result).toEqual(mockData);
    });

    test('updateEquipmentStatus должен делать PUT-запрос на /equipment/:id', async () => {
        const mockData = { id: 1, status: 'Работает' };
        const axiosPutMock = jest.mocked(axiosInstance.put);
        axiosPutMock.mockResolvedValueOnce({ data: mockData });

        const result = await EquipmentService.updateEquipmentStatus(1, 'Работает');

        expect(axiosPutMock).toHaveBeenCalledTimes(1);
        expect(axiosPutMock).toHaveBeenCalledWith('/equipment/1', { status: 'Работает' });
        expect(result).toEqual(mockData);
    });

    test('getEquipment должен выбрасывать ошибку при неудачном запросе', async () => {
        const errorMessage = 'Ошибка сети';
        const axiosGetMock = jest.mocked(axiosInstance.get);
        axiosGetMock.mockRejectedValueOnce(new Error(errorMessage));

        await expect(EquipmentService.getEquipment()).rejects.toThrowError(new Error(errorMessage));
        expect(axiosGetMock).toHaveBeenCalledTimes(1);
    });
});
