import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../../shared/lib/hooks';
import { updateOrderStatus } from '../model/ordersSlice';

export default function UpdateOrderModal({
  open,
  onClose,
  orderId,
  currentStatus,
}: {
  open: boolean;
  onClose: () => void;
  orderId: number;
  currentStatus: string;
}) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState(currentStatus);

  const handleSave = () => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Изменить статус заказа</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Статус</InputLabel>
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
