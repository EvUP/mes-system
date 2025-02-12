import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
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
    { field: 'status', headerName: 'Статус', minWidth: 150, flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Дата создания',
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.value) return 'Нет данных';
        return timestampToDDMMYY(String(params.value));
      },
    },
    {
      field: 'updatedAt',
      headerName: 'Дата обновления',
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.value) return 'Нет данных';
        return timestampToDDMMYY(String(params.value));
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={list || []} 
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(equipment) => handleSetOrder(equipment.row)}
      />
    </Box>
  );
}
