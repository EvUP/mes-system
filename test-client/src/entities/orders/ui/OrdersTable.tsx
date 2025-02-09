import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { timestampToDDMMYY } from '../../../shared';
import { TOrderEntity } from '../type/orderEntity';

type OrderTableProps = {
  handleSetOrder: (order: TOrderEntity) => void;
  loading: boolean;
  list: TOrderEntity[];
};

export default function OrdersTable({
  handleSetOrder,
  loading,
  list,
}: OrderTableProps): React.JSX.Element {
  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: '№ Заказа', flex: 1 },
    { field: 'productName', headerName: 'Продукт', flex: 1 },
    { field: 'quantity', headerName: 'Кол-во', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    {
      field: 'startDate',
      headerName: 'Дата старта',
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
    {
      field: 'endDate',
      headerName: 'Дата окончания',
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
  ];

  return (
    <DataGrid
      rows={list}
      columns={columns}
      onRowClick={(order) => {
        handleSetOrder(order.row);
      }}
    />
  );
}
