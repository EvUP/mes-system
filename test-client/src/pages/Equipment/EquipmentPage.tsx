import React, { useState } from 'react';
import { EquipmentTable, UpdateEquipmentModal } from '../../entities/equipment';

export default function EquipmentPage(): React.JSX.Element {
  const [modalState, setModalState] = useState(false);
  const [equipment, setEquipment] = useState<{ id: number; status: string } | null>(null);

  return (
    <>
      <EquipmentTable
        handleSetOrder={(equipment) => {
          setEquipment(equipment);
          setModalState(true);
        }}
      />
      <UpdateEquipmentModal
        open={modalState}
        onClose={() => {
          setModalState(false);
          setEquipment(null);
        }}
        equipmentId={equipment?.id ?? null} 
        currentStatus={equipment?.status ?? null}
      />
    </>
  );
}
