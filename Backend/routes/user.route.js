import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { login, signup, logout } from "../controllers/user.controller.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;