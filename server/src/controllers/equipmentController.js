const equipmentService = require('../services/equipmentService');

class EquipmentController {
  async getAllEquipment(req, res) {
    try {
      const equipment = await equipmentService.getAllEquipment();
      res.status(200).json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при получении оборудования' });
    }
  }

  async updateEquipmentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedEquipment = await equipmentService.updateEquipmentStatus(id, status);
      res.status(200).json(updatedEquipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при обновлении оборудования' });
    }
  }
}

module.exports = new EquipmentController();
