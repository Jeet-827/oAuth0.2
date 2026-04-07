import { Router } from "express";
import upload from "../middleware/upload.js";
import { verify } from "../middleware/verify.js";
import { createPost } from "../controller/Post.controller.js";
const route = Router()

route.post('/post', verify, upload.single('image'), createPost)
export default route