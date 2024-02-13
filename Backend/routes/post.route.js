import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { post } from "../controllers/post.controller.js";

const router = Router();
router.post("/post", post);

export default Router;