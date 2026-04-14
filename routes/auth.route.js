import { Router } from "express";
import passport from "passport";

const route = Router()

route.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

route.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
        res.send("login Sucess")
    }

)

export default route