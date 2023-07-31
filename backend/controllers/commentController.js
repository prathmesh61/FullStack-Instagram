import { prisma } from "../prisma/index.js";

// create comment route:- /api/create-comment/:postId
export const newComment = async (req, res) => {
  const { id } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        postId: req.params.postId,
        userId: id,
      },
    });
    // comment push to post comment array
    const post = await prisma.post.update({
      where: {
        id: req.params.postId,
      },
      data: {
        comments: {
          connect: {
            id: comment.id,
          },
        },
        commentsId: {
          push: comment.id,
        },
      },
    });
    res.status(201).json({
      comment: comment,
      post: post,
      success: true,
      message: "Comment created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
      message: "Something went wrong",
    });
  }
};
