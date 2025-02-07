const { Equipment } = require('../../db/models');

class EquipmentService {
  async getAllEquipment() {
    return Equipment.findAll();
  }

  async updateEquipmentStatus(id, status) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) throw new Error('Оборудование не найдено');

    equipment.status = status;
    await equipment.save();
    return equipment;
  }
}

module.exports = new EquipmentService();
