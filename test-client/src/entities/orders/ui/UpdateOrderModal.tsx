import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
  MenuItem,
  Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { fetchOrders, updateOrderStatus } from '../model/ordersSlice';

export default function UpdateOrderModal({
  open,
  onClose,
  orderId = null,
  currentStatus = null,
}: {
  open: boolean;
  onClose: () => void;
  orderId?: number | null;
  currentStatus?: string | null;
}) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  if (!orderId || !status) {
    return null;
  }

  const handleSave = async () => {
    await dispatch(updateOrderStatus({ id: orderId, status }));
    await dispatch(fetchOrders({ page: 1, limit: 10 }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Изменить статус заказа</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Typography variant="subtitle1" sx={{ p: 1 }}>
            Статус
          </Typography>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="В процессе">В процессе</MenuItem>
            <MenuItem value="Завершено">Завершено</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
