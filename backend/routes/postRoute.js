import express from "express";

import { verifyToken } from "../lib/verifyToken.js";
import {
  allpost,
  deletepost,
  likepost,
  newpost,
  singlepost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/newpost", verifyToken, newpost);
router.delete("/delete-post/:id", verifyToken, deletepost);
router.get("/all-posts", allpost);
router.get("/post/:id", singlepost);
router.put("/like/:id", verifyToken, likepost);

export default router;
