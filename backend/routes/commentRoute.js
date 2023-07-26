import express from "express";

import { newComment } from "../controllers/commentController.js";

const router = express.Router();
router.post("/create-comment/:postId", newComment);
export default router;
