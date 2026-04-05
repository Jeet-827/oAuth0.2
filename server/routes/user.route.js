import { Router } from "express";
import { RegisterUser } from "../controller/Auth.Controller.js";
import { LoginUser } from "../controller/Auth.Controller.js";
const router = Router()

router.post('/register', RegisterUser)
router.post('/login', LoginUser)


export default router