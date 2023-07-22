import express from "express";

import { verifyToken } from "../lib/verifyToken.js";
import {
  allpost,
  deletepost,
  likepost,
  myposts,
  newpost,
  singlepost,
  trendingPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/newpost", verifyToken, newpost);
router.delete("/delete-post/:id", verifyToken, deletepost);
router.get("/all-posts", allpost);
router.get("/post/:id", singlepost);
router.get("/my-posts", verifyToken, myposts);
router.get("/trending-posts", trendingPost);
router.put("/like/:id", verifyToken, likepost);

export default router;
