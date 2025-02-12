import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CircularProgress, Box } from '@mui/material';
import { timestampToDDMMYY } from '../../../shared';
import { TOrderEntity } from '../type/orderEntity';

type OrderTableProps = {
  handleSetOrder: (order: TOrderEntity) => void;
  loading: boolean;
  list: TOrderEntity[];
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  paginationModel: { page: number; pageSize: number };
};

export default function OrdersTable({
  handleSetOrder,
  loading,
  list,
  onPageChange,
  onPageSizeChange,
  paginationModel,
}: OrderTableProps): React.JSX.Element {
  if (loading) return <CircularProgress />;

  const columns: GridColDef[] = [
    { field: 'orderNumber', headerName: '№ Заказа', minWidth: 150, flex: 1 },
    { field: 'productName', headerName: 'Продукт', minWidth: 200, flex: 1 },
    { field: 'quantity', headerName: 'Кол-во', minWidth: 100, flex: 1 },
    { field: 'status', headerName: 'Статус', minWidth: 150, flex: 1 },
    {
      field: 'startDate',
      headerName: 'Дата старта',
      minWidth: 180,
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
    {
      field: 'endDate',
      headerName: 'Дата окончания',
      minWidth: 180,
      flex: 1,
      valueFormatter: (value) => timestampToDDMMYY(value),
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={list}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={(newPaginationModel) => {
          onPageChange(newPaginationModel.page);
          onPageSizeChange(newPaginationModel.pageSize);
        }}
        pageSizeOptions={[10, 25, 50]}
        onRowClick={(row) => handleSetOrder(row.row)}
      />
    </Box>
  );
}  
