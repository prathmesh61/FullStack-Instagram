import prisma from "../prisma/index.js";

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "user not created",
    });
  }
};
