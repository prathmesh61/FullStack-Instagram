import express from "express";
import {
  followAndunfollow,
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../lib/verifyToken.js";

const router = express.Router();

router.route("/createuser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/:id").get(verifyToken, userProfile);
router.post("/profile/:id", verifyToken, userProfile);
router.put("/follow/:id", verifyToken, followAndunfollow);

export default router;
