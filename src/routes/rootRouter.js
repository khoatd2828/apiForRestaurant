import express from 'express'   
import restaurant from './restaurantRouter.js'

const rootRouter = express()

rootRouter.use("/restaurant", restaurant)

export default rootRouter