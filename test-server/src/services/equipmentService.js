const { Equipment } = require('../../db/models');

class EquipmentService {
  async getAllEquipment() {
    const equipment = await Equipment.findAll({
      attributes: ['id', 'name', 'status', 'createdAt', 'updatedAt'],
    });
    return equipment;
  }

  async updateEquipmentStatus(id, status) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error('Оборудование не найдено');
    }

    equipment.status = status;
    equipment.updatedAt = new Date();
    await equipment.save();
    return equipment;
  }
}

module.exports = new EquipmentService();
