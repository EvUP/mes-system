import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Paper } from '@mui/material';

type GanttData = {
  name: string;
  duration: number;
};

export default function GanttChart({ data }: { data: GanttData[] }): React.JSX.Element {
  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6">График выполнения заказов</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#3f51b5" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
