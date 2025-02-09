import React, { useEffect, useState } from 'react';
import { OrdersTable, UpdateOrderModal } from '../../entities/orders';
import { GanttChart } from '../../widgets';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { fetchOrders } from '../../entities/orders';
import { TOrderEntity } from '../../entities/orders';
import Style from './Style.module.css';

export default function OrdersPage(): React.JSX.Element {
  const [modalState, setModalState] = useState(false);
  const [order, setOrder] = useState<TOrderEntity | null>(null); // ✅ Используем null
  const dispatch = useAppDispatch();
  const { list: orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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
