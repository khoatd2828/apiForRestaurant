import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_res from  "./like_res.js";
import _order_restaurant from  "./order_restaurant.js";
import _rate_res from  "./rate_res.js";
import _restaurant from  "./restaurant.js";
import _sub_food from  "./sub_food.js";
import _user_restaurant from  "./user_restaurant.js";

export default function initModels(sequelize) {
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_res = _like_res.init(sequelize, DataTypes);
  const order_restaurant = _order_restaurant.init(sequelize, DataTypes);
  const rate_res = _rate_res.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);
  const user_restaurant = _user_restaurant.init(sequelize, DataTypes);

  order_restaurant.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(order_restaurant, { as: "order_restaurants", foreignKey: "food_id"});
  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  food.belongsTo(food_type, { as: "type", foreignKey: "type_id"});
  food_type.hasMany(food, { as: "foods", foreignKey: "type_id"});
  like_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "res_id"});
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id"});
  like_res.belongsTo(user_restaurant, { as: "user", foreignKey: "user_id"});
  user_restaurant.hasMany(like_res, { as: "like_res", foreignKey: "user_id"});
  order_restaurant.belongsTo(user_restaurant, { as: "user", foreignKey: "user_id"});
  user_restaurant.hasMany(order_restaurant, { as: "order_restaurants", foreignKey: "user_id"});
  rate_res.belongsTo(user_restaurant, { as: "user", foreignKey: "user_id"});
  user_restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id"});

  return {
    food,
    food_type,
    like_res,
    order_restaurant,
    rate_res,
    restaurant,
    sub_food,
    user_restaurant,
  };
}
