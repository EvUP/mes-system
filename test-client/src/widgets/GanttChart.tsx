import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Typography, Paper } from '@mui/material';
import { TOrderEntity } from '../entities/orders/type/orderEntity';
import { msToTime, parseDate } from '../shared/utils';

const renderCustomBarLabel = ({
  x,
  y,
  width,
  value,
}: {
  payload: unknown;
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
}) => {
  return (
    <text x={x + width / 2} y={y + 4} fill="#666" textAnchor="middle" dy={-6}>
      Время рботы: {msToTime(value)}
    </text>
  );
};

const generateChartData = (data: TOrderEntity[]) => {
  return data.map((item) => ({
    name: item.productName,
    duration: parseDate(item.endDate).getTime() - parseDate(item.startDate).getTime(),
    status: item.status,
  }));
};

export default function GanttChart({ data }: { data: TOrderEntity[] }): React.JSX.Element {
  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6">График выполнения заказов</Typography>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={generateChartData(data)}>
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis hide />
          <Bar barSize={30} dataKey="duration" fill="#8884d8" label={renderCustomBarLabel} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
