import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { postphotos } from "../controllers/post.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/postphotos", isLoggedIn, upload.array('files', 10), postphotos);

export default router;