import rootRouter from './routes/rootRouter.js'
import mysql from 'mysql2';
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors())
app.use(rootRouter)
app.listen(8080)