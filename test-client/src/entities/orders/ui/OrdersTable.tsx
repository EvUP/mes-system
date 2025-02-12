import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CircularProgress, Box, IconButton } from '@mui/material';
import { timestampToDDMMYY } from '../../../shared';
import { TOrderEntity } from '../type/orderEntity';
import EditIcon from '@mui/icons-material/Edit';

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
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2, 
        }}
      />
    </Box>
  );
}
