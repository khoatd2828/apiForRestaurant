import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class rate_res extends Model {
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
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurant',
        key: 'res_id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_rate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rate_res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'rate_res',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rate_res_id" },
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
        name: "res_id",
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
  }
}
