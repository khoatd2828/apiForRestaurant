import express from 'express'
import { getFood, likeDislike, getLikeRes, getLikeOfUser, addRate, getRateOfRestaurant, getRateOfUser } from '../controllers/resController.js'

const resRouter = express.Router()

resRouter.get("/get-food", getFood)
resRouter.post('/like-dislike', likeDislike)
resRouter.get('/get-like-res/:res_id', getLikeRes)
resRouter.get('/get-like-user/:user_id', getLikeOfUser)

resRouter.post("/add-rate", addRate); 

resRouter.get("/get-rate-res/:res_id", getRateOfRestaurant); 

resRouter.get("/get-rate-user/:user_id", getRateOfUser); 

export default resRouter