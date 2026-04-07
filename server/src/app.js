import express from "express"
import dotenv from "dotenv"
import connect from "../config/server.config.js"
import authrouter from "../routes/user.route.js"
import Profile from "../routes/profile.route.js"
import gettoken from "../routes/token.route.js"
import postRoute from "../routes/post.route.js"
import cors from "cors"


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()
connect()
app.use('/api/auth/', authrouter)
app.use('/api/auth/', Profile)
app.use('/api/auth/', gettoken)
app.use('/api/auth/', postRoute)
export default app