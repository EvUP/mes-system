const orderService = require('../services/orderService');

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при получении заказов' });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера при обновлении заказа' });
    }
  }
}

module.exports = new OrderController();
