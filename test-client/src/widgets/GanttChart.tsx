import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TOrderEntity } from '../entities/orders/type/orderEntity';
import { msToTime, parseDate } from '../shared/utils';

type SelectedDetail = {
  name: string;
  status: string;
  duration: number;
};

const CustomBarLabel = React.memo(
  ({ x, y, width, value }: { x: number; y: number; width: number; value: number }) => (
    <text x={x + width / 2} y={y + 4} fill="#fff" textAnchor="middle" dy={-6} fontSize={12}>
      {msToTime(value)}
    </text>
  ),
);

const generateChartData = (data: TOrderEntity[]) => {
  return data.map((item) => ({
    name: item.productName,
    duration: parseDate(item.endDate).getTime() - parseDate(item.startDate).getTime() || 0,
    status: item.status,
    startDate: parseDate(item.startDate), 
  }));
};

const GanttChart = ({ data }: { data: TOrderEntity[] }) => {
  const [filterStatus, setFilterStatus] = useState<string>('Все');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default'); 
  const [selectedDetail, setSelectedDetail] = useState<SelectedDetail | null>(null);
  const chartData = useMemo(() => generateChartData(data), [data]);

  const filteredData = useMemo(() => {
    return chartData.filter((item) => filterStatus === 'Все' || item.status === filterStatus);
  }, [chartData, filterStatus]);

  const sortedData = useMemo(() => {
    let sorted = [...filteredData];

    if (sortOrder === 'default') {
      sorted = sorted.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    }

    if (sortOrder === 'asc' || sortOrder === 'desc') {
      sorted = sorted.sort((a, b) => {
        const durationA = a.duration ?? 0;
        const durationB = b.duration ?? 0;

        if (sortOrder === 'asc') {
          return durationA > durationB ? 1 : -1;
        }
        return durationA < durationB ? 1 : -1;
      });
    }
    return sorted;
  }, [filteredData, sortOrder]);

  const handleBarClick = useCallback(
    (data: SelectedDetail) => {
      setSelectedDetail(data);
    },
    [setSelectedDetail],
  );

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }} align="center">
        График выполнения заказов
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel>Статус</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Статус"
          >
            <MenuItem value="Все">Все</MenuItem>
            <MenuItem value="В процессе">В процессе</MenuItem>
            <MenuItem value="Завершено">Завершено</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: 200 }}>
          <InputLabel>Сортировка</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | 'default')}
            label="Сортировка"
          >
            <MenuItem value="default">По умолчанию</MenuItem>
            <MenuItem value="asc">По возрастанию (по длительности)</MenuItem>
            <MenuItem value="desc">По убыванию (по длительности)</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value}
              tick={{ fill: '#888', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: 8,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: string | number) => {
                if (typeof value === 'number') {
                  const hours = Math.floor(value / 3600000);
                  return [`В работе`, `${hours} час(ов)`];
                }
                return ['В работе', '0 час(ов)'];
              }}
            />
            <Bar
              barSize={30}
              dataKey="duration"
              fill="url(#gradient)"
              label={<CustomBarLabel x={0} y={0} width={0} value={0} />}
              onClick={(data) => handleBarClick(data)} 
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {selectedDetail && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <Typography variant="body1">
            <strong>Деталь:</strong> {selectedDetail.name}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {selectedDetail.status}
          </Typography>
          <Typography variant="body1">
            <strong>Длительность:</strong> {msToTime(selectedDetail.duration)}
          </Typography>
        </Box>
      )}

      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </svg>
    </Paper>
  );
};

GanttChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default GanttChart;
