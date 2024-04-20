import { Sequelize } from "sequelize";
import config from '../configs/config.js'

const sequelize = new Sequelize("restaurant_system","root","1234",{
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

export default sequelize