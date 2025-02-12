import { TOrderEntity } from '../../../entities/orders/type/orderEntity';
import { parseDate } from '../../../shared/utils';

export const generateChartData = (data: TOrderEntity[]) => {
  return data.map((item) => ({
    name: item.productName,
    duration: parseDate(item.endDate).getTime() - parseDate(item.startDate).getTime() || 0,
    status: item.status,
    startDate: parseDate(item.startDate),
  }));
};
