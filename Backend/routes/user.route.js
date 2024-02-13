import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { login, signup } from "../controllers/user.controller.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;