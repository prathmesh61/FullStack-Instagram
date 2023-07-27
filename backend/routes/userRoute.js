import express from "express";
import {
  followAndunfollow,
  getuser,
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../lib/verifyToken.js";

const router = express.Router();

router.route("/createuser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/:id").get(userProfile);
router.get("/getuser", verifyToken, getuser);
// router.post("/profile/:id", verifyToken, userProfile);
router.put("/follow/:id", verifyToken, followAndunfollow);
router.post("/logout", verifyToken, logoutUser);

export default router;
