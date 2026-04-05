import { Router } from "express";
import { verify } from "../middleware/verify.js";
import { sendProfile } from "../controller/profile.controller.js";
const route = Router()

route.get('/profile', verify, sendProfile)

export default route