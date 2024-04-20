import express from "express";
import { order } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/order/:food_id", order); 

export default userRouter;