import { prisma } from "../prisma/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// register user route:- /api/createuser
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error("Please fill all the fields");
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error("User already exists");
    }

    const user_password = bcrypt.hashSync(password, 10);
    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        hashpassword: user_password,
      },
    });
    const token = jwt.sign({ id: createUser.id }, process.env.JWT);
    res.status(201).cookie("access_token", token, { httpOnly: true }).json({
      success: true,
      msg: "User Create Successfuly",
      createUser,
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "user not created",
    });
  }
};

// login user route:- /api/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("user not exists");
    }

    const isMatch = bcrypt.compareSync(password, user.hashpassword);
    if (!isMatch) {
      throw new Error("wrong credentials provided");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      success: false,
      message: "user not exists",
      error: error.message,
    });
  }
};

// user profile route:- /api/profile
export const userProfile = async (req, res) => {
  console.log(req.user);
};
