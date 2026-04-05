import { Router } from "express";
import { verify } from "../middleware/verift.js";
import { sendProfile } from "../controller/profile.controller.js";
const route = Router()

route.get('/profile', verify, sendProfile)

export default route