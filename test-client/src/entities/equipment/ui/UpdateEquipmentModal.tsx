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
import { fetchEquipment, updateEquipmentStatus } from '../model/equipmentThunks';

export default function UpdateEquipmentModal({
  open,
  onClose,
  equipmentId = null,
  currentStatus = null,
}: {
  open: boolean;
  onClose: () => void;
  equipmentId?: number | null;
  currentStatus?: string | null;
}) {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  if (!equipmentId || !status) {
    return null;
  }

  const handleSave = async () => {
    await dispatch(updateEquipmentStatus({ id: equipmentId, status }));
    await dispatch(fetchEquipment());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Изменить статус оборудования</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Typography variant="subtitle1" sx={{ p: 1 }}>
            Статус
          </Typography>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Работает">Работает</MenuItem>
            <MenuItem value="Остановлено">Остановлено</MenuItem>
            <MenuItem value="Техническое обслуживание">Техническое обслуживание</MenuItem>
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
