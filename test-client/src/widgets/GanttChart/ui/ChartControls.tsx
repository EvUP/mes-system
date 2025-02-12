import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

type ChartControlsProps = {
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  sortOrder: 'asc' | 'desc' | 'default';
  setSortOrder: (value: 'asc' | 'desc' | 'default') => void;
};

const ChartControls = ({ filterStatus, setFilterStatus, sortOrder, setSortOrder }: ChartControlsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <FormControl variant="outlined" sx={{ width: 200 }}>
        <InputLabel>Статус</InputLabel>
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} label="Статус">
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
  );
};

export default ChartControls;
