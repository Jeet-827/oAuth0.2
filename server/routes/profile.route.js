import { Router } from "express";
import { verify } from "../middleware/verify.js";
import { getProfile } from "../controller/profile.controller.js";
const route = Router();

route.get('/profile', verify, getProfile);

export default route;