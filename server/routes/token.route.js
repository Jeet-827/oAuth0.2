import { Router } from "express";
import createToken from "../controller/Token.Controller.js";
const route = Router();

route.post('/token', createToken);

export default route;
