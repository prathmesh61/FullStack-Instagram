import jwt from "jsonwebtoken";
import { prisma } from "../prisma/index.js";
export const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) return res.status(401).send("token not valid");

  try {
    const verifyToken = jwt.verify(token, process.env.JWT);
    const user = await prisma.user.findUnique({
      where: {
        id: verifyToken.id,
      },
    });
    req.user = user.id;

    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
