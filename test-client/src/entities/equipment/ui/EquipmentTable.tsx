import { Box, CircularProgress, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { timestampToDDMMYY } from '../../../shared/utils/date-helper.util';
import { fetchEquipment } from '../model/equipmentThunks';
import type { EquipmentT } from '../model/types';

type EquipmentTableProps = {
  handleSetOrder: (equipment: EquipmentT) => void;
};

export default function EquipmentTable({ handleSetOrder }: EquipmentTableProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.equipment);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const columns: GridColDef<EquipmentT>[] = [
    { field: 'name', headerName: 'Оборудование', minWidth: 200, flex: 1 },
    {
      field: 'status',
      headerName: 'Статус',
      minWidth: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{params.value}</span>
          <IconButton size="small" onClick={() => handleSetOrder(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Дата создания',
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? timestampToDDMMYY(String(params.value)) : 'Нет данных',
    },
    {
      field: 'updatedAt',
      headerName: 'Дата обновления',
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? timestampToDDMMYY(String(params.value)) : 'Нет данных',
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={list || []}
        columns={columns}
        getRowId={(row) => row.id}
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2,
        }}
      />
    </Box>
  );
}
  
