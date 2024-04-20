import express from 'express'   
import restaurant from './restaurantRouter.js'
import userRoute from './userRouter.js'

const rootRouter = express()

rootRouter.use("/restaurant", restaurant)
rootRouter.use("/user", userRoute);

export default rootRouter