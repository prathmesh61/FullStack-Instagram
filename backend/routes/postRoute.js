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

router.post("/newpost", newpost);
router.get("/all-posts", allpost);
router.get("/post/:id", singlepost);
router.get("/trending-posts", trendingPost);
router.put("/like/:id", likepost);
router.delete("/delete-post/:id", deletepost);
router.get("/my-posts/:id", myposts);

export default router;
