import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../lib/verifyToken.js";

const router = express.Router();

router.route("/createuser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(verifyToken, userProfile);

export default router;
