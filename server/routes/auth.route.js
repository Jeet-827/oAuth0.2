import { Router } from "express";
import passport from "passport";
import { register, login } from "../controller/Auth.Controller.js";
import { genrateAccess, genrateRefresh } from "../utils/CreateToken.js";

const route = Router()

route.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

route.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    (req, res) => {
        const user = req.user;
        const accesstoken = genrateAccess(user.id)
        const refreshtoken = genrateRefresh(user.id)



        res.cookie("refreshToken", refreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.redirect(`http://localhost:5173/signup?accesstoken=${accesstoken}`);

    }
);


route.post('/register', register)
route.post('/login', login)

export default route