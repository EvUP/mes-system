import { Box, Paper, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TOrderEntity } from '../../../entities/orders/type/orderEntity';
import { generateChartData } from '../lib/generateChartData';
import ChartControls from './ChartControls';
import styles from './Style.module.css';

type SelectedDetail = {
  name: string;
  status: string;
  duration: number;
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
    if (sortOrder !== 'default') {
      sorted = sorted.sort((a, b) =>
        sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration,
      );
    }
    return sorted;
  }, [filteredData, sortOrder]);

  const handleBarClick = useCallback((data: SelectedDetail) => {
    setSelectedDetail(data);
  }, []);

  return (
    <Paper className={styles.chartContainer}>
      <Typography variant="h6" className={styles.chartHeader}>
        График выполнения заказов
      </Typography>

      <ChartControls
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <Box sx={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
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
              formatter={(value: number) => [`Длительность`, `${Math.round(value / 3600000)} ч.`]}
            />
            <Bar
              barSize={30}
              dataKey="duration"
              fill="url(#gradient)"
              onClick={(data) => handleBarClick(data)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {selectedDetail && (
        <Box className={styles.detailBox}>
          <Typography variant="body1">
            <strong>Деталь:</strong> {selectedDetail.name}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {selectedDetail.status}
          </Typography>
          <Typography variant="body1">
            <strong>Длительность:</strong> {Math.round(selectedDetail.duration / 3600000)} ч.
          </Typography>
          <button className={styles.closeButton} onClick={() => setSelectedDetail(null)}>
            Закрыть
          </button>
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

export default GanttChart;
