import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { fetchEquipment } from '../model/equipmentSlice';
import { timestampToDDMMYY } from '../../../shared/utils/date-helper.util';

type EquipmentTableProps = {
  handleSetOrder: (equipment: { id: number; status: string }) => void;
};

export default function EquipmentTable({ handleSetOrder }: EquipmentTableProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.equipment);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Оборудование', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Дата создания',
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
    {
      field: 'updatedAt',
      headerName: 'Дата обновления',
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={list}
        columns={columns}
        onRowClick={(equipment) => handleSetOrder(equipment.row)}
      />
    </div>
  );
}
