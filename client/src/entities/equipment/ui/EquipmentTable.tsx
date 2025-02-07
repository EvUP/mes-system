import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { fetchEquipment } from '../model/equipmentSlice';

export default function EquipmentTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.equipment);

  useEffect(() => {
    dispatch(fetchEquipment());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [{ field: 'name', headerName: 'Оборудование', flex: 1 }];

  return <DataGrid rows={list} columns={columns} autoHeight />;
}
