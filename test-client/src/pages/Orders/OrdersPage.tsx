import React, { useEffect, useState } from 'react';
import { fetchOrders, OrdersTable, TOrderEntity, UpdateOrderModal } from '../../entities/orders';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { GanttChart } from '../../widgets';
import Style from './Style.module.css';

export default function OrdersPage(): React.JSX.Element {
  const [modalState, setModalState] = useState(false);
  const [order, setOrder] = useState<TOrderEntity | null>(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const dispatch = useAppDispatch();
  const { list: orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({ page: paginationModel.page, limit: paginationModel.pageSize }));
  }, [dispatch, paginationModel]);

  return (
    <div className={Style.container}>
      {orders.length > 0 && <GanttChart data={orders} />}
      <OrdersTable
        handleSetOrder={(order) => {
          setOrder(order);
          setModalState(true);
        }}
        list={orders}
        loading={loading}
        paginationModel={paginationModel}
        onPageChange={(newPage) => setPaginationModel((prev) => ({ ...prev, page: newPage }))}
        onPageSizeChange={(newPageSize) =>
          setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }))
        }
      />
      <UpdateOrderModal
        open={modalState}
        onClose={() => {
          setModalState(false);
          setOrder(null);
        }}
        orderId={order?.id ?? null}
        currentStatus={order?.status ?? null}
      />
    </div>
  );
}
