import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_restaurant extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_restaurant',
        key: 'user_id'
      }
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'food',
        key: 'food_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    arr_sub_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    orders_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'order_restaurant',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orders_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "food_id",
        using: "BTREE",
        fields: [
          { name: "food_id" },
        ]
      },
    ]
  });
  }
}
