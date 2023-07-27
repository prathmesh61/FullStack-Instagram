import { prisma } from "../prisma/index.js";

// create post route:- /api/newpost
export const newpost = async (req, res) => {
  const { content, img } = req.body;
  if (content === "") {
    throw new error("Please fill all the field");
  }
  try {
    const post = await prisma.post.create({
      data: {
        content,
        img,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.status(200).json({ post, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
// delete post route:- /api/deletepost/:id
export const deletepost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ deletePost, message: "post deleted", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
// all post route:- /api/all-posts
export const allpost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({ posts, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
// get single post route:- /api/post/:id
export const singlepost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({ post, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// get user personal post route:- /api/my-posts
export const myposts = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({ posts, success: true, message: "all your posts" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
      message: "you are not authorized to perform this action",
    });
  }
};
// like post route:- /api/like/:id
export const likepost = async (req, res) => {
  const { id } = req.params;
  const yourID = req.user.id;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  try {
    if (!post.likesId.includes(yourID)) {
      const like = await prisma.post.update({
        where: {
          id,
        },
        data: {
          likesId: {
            push: yourID,
          },
        },
      });
      res.status(200).json({ like, success: true });
    } else {
      let updateLikes = [...(post.likesId || [])];
      updateLikes = updateLikes.filter((item) => item !== yourID);
      const dislike = await prisma.post.update({
        where: {
          id,
        },
        data: {
          likesId: updateLikes,
        },
      });
      res.status(200).json({ dislike, success: true });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
      message: "you are not authorized to perform this action",
    });
  }
};

// trending post route:- /api/trending-posts
export const trendingPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        likesId: "desc",
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({ posts, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};
