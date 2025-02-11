'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        id: 1,
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: 'operator',
        password: await bcrypt.hash('operator123', 10),
        role: 'operator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', users);

    const orders = Array.from({ length: 20 }, (_, i) => {
      const startDay = (i % 28) + 1; 
      const duration = Math.floor(Math.random() * 7) + 1; 
      const startDate = new Date(`2024-01-${startDay < 10 ? '0' : ''}${startDay}`);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);

      return {
        id: i + 1,
        orderNumber: `ORD${1000 + i}`,
        productName: `Деталь ${i + 1}`,
        quantity: 100 + i,
        status: i % 2 === 0 ? 'В процессе' : 'Завершено',
        startDate: startDate,
        endDate: endDate,
        userId: i % 2 === 0 ? 1 : 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Orders', orders);

    const equipment = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Станок ${i + 1}`,
      status: i % 2 === 0 ? 'Работает' : 'Остановлено',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Equipment', equipment);

    const orderEquipment = [];
    for (let orderId = 1; orderId <= 20; orderId++) {
      const equipmentSet = new Set();
      while (equipmentSet.size < 2) {
        equipmentSet.add(Math.floor(Math.random() * 5) + 1);
      }
      equipmentSet.forEach((equipmentId) => {
        orderEquipment.push({ orderId, equipmentId });
      });
    }
    await queryInterface.bulkInsert('OrderEquipment', orderEquipment);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderEquipment', null, {});
    await queryInterface.bulkDelete('Equipment', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
