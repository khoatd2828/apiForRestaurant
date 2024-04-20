import express from 'express'
import { getFood, likeDislike, getLikeRes } from '../controllers/resController.js'

const resRouter = express.Router()

resRouter.get("/get-food", getFood)
resRouter.post('/like-dislike', likeDislike)
resRouter.get('/get-like/:res_id', getLikeRes)


export default resRouter