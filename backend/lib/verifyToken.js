import jwt from "jsonwebtoken";
import { prisma } from "../prisma/index.js";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send("token not valid");

  try {
    const verifyToken = jwt.verify(token, process.env.JWT);

    req.user = await prisma.user.findUnique({
      where: {
        id: verifyToken.id,
      },
    });

    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
