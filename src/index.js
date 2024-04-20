import rootRouter from './routes/rootRouter.js'
import mysql from 'mysql2';
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(rootRouter)
app.use(express.json())
app.listen(8080)