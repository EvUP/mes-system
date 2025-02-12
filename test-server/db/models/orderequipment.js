'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderEquipment extends Model {
    static associate({ Order, Equipment }) {
      this.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
      this.belongsTo(Equipment, { foreignKey: 'equipmentId', as: 'equipment' });
    }
  }

  OrderEquipment.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Equipment',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      modelName: 'OrderEquipment',
      timestamps: true,
    },
  );

  return OrderEquipment;
};
