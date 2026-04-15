import { Router } from "express";
import passport from "passport";
import { register, login } from "../controller/Auth.Controller.js";

const route = Router()

route.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

route.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
        res.status(200).json({ message: "user are login " })
    }

)

route.post('/register', register)
route.post('/login', login)

export default route