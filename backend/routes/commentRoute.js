import express from "express";

import { verifyToken } from "../lib/verifyToken.js";
import { newComment } from "../controllers/commentController.js";

const router = express.Router();
router.post("/create-comment/:postId", verifyToken, newComment);
export default router;
