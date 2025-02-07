const { Order } = require('../../db/models');

class OrderService {
  async getAllOrders() {
    return Order.findAll();
  }

  async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Заказ не найден');
    
    order.status = status;
    await order.save();
    return order;
  }
}

module.exports = new OrderService();
