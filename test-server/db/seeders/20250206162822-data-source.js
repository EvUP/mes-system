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

    const orders = [
      {
        id: 1,
        orderNumber: 'ORD123',
        productName: 'Деталь A',
        quantity: 100,
        status: 'В процессе',
        startDate: new Date('2023-10-01'),
        endDate: new Date('2023-10-05'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        orderNumber: 'ORD124',
        productName: 'Деталь B',
        quantity: 50,
        status: 'Завершено',
        startDate: new Date('2023-10-02'),
        endDate: new Date('2023-10-04'),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Orders', orders);

    const equipment = [
      {
        id: 1,
        name: 'Станок 1',
        status: 'Работает',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Станок 2',
        status: 'Остановлено',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Equipment', equipment);

    const orderEquipment = [
      {
        orderId: 1,
        equipmentId: 1,
      },
      {
        orderId: 1,
        equipmentId: 2,
      },
      {
        orderId: 2,
        equipmentId: 2,
      },
    ];
    await queryInterface.bulkInsert('OrderEquipment', orderEquipment);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderEquipment', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('Equipment', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
