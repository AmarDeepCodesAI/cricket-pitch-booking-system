import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  login,
  register,
  getMe,
} from "../controllers/auth.controller";
const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/me",
  authenticate,
  getMe
);

export default router;