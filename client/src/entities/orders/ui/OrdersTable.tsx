import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { fetchOrders } from '../model/ordersSlice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';

export default function OrdersTable(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: '№ Заказа', flex: 1 },
    { field: 'productName', headerName: 'Продукт', flex: 1 },
    { field: 'quantity', headerName: 'Кол-во', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
  ];

  return <DataGrid rows={list} columns={columns} autoHeight />;
}
