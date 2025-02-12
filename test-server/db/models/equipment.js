'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate({ Order, OrderEquipment }) {
      this.belongsToMany(Order, {
        through: OrderEquipment,
        foreignKey: 'equipmentId',
        as: 'orders',
      });
    }
  }

  Equipment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('Работает', 'Остановлено', 'Техническое обслуживание'),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Equipment',
      timestamps: true,
      hooks: {
        beforeUpdate: (equipment) => {
          equipment.updatedAt = new Date(); 
        },
      },
    }
  );
  

  return Equipment;
};
