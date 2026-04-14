import "dotenv/config"
import express from 'express'
import AuthRouter from "./routes/auth.route.js"
import passport from './config/Google.config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.set("views", "./views")
app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("login")
})

app.use("/api/auth/", AuthRouter)

app.listen(3000, () => {
    console.log("Srver is start")
})

