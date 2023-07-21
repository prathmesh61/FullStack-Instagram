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

// user profile route:- /api/profile/:id
export const userProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    res.status(200).json({ user });
  } catch (error) {
    res.ststus(401).json({
      success: false,
      message: "user not exists",
      error: error.message,
    });
  }
};

// user update route:- /api/update/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("you can not update this user");
    }
    if (id === req.user.id) {
      const updateUser = await prisma.user.update({
        where: { id },
        data: { ...req.body },
      });
      res.status(200).json({
        success: true,
        message: "user updated successfully",
        updateUser,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "user not exists",
      error: error.message,
    });
  }
};

// follow user route:- /api/follow/:id
// export const followUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const yourID = req.user.id;

//     const followUser = await prisma.user.update({
//       where: { id },
//       data: {
//         followers: {
//           push: yourID,
//         },
//       },
//     });
//     res.status(200).json({ success: true, followUser });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// unfollow user route:- /api/unfollow/:id
// export const UnfollowUser = async (req, res) => {
//   const { id } = req.params;
//   const yourID = req.user.id;
//   const user = await prisma.user.findUnique({ where: { id } });

//   let updateFollowers = [...(user.followers || [])];
//   updateFollowers = updateFollowers.filter((item) => item !== yourID);
//   try {
//     const UnfollowUser = await prisma.user.update({
//       where: { id },
//       data: {
//         followers: updateFollowers,
//       },
//     });
//     res.status(200).json({ success: true, UnfollowUser });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// followAndunfollow user route:- /api/follow/:id
export const followAndunfollow = async (req, res) => {
  const { id } = req.params;
  const yourID = req.user.id;
  const user = await prisma.user.findUnique({ where: { id } });
  try {
    if (!user.followers.includes(yourID)) {
      const followUser = await prisma.user.update({
        where: { id },
        data: {
          followers: {
            push: yourID,
          },
        },
      });
      res
        .status(200)
        .json({ success: true, message: "user updated", followUser });
    } else {
      let updateFollowers = [...(user.followers || [])];
      updateFollowers = updateFollowers.filter((item) => item !== yourID);
      const UnfollowUser = await prisma.user.update({
        where: { id },
        data: {
          followers: updateFollowers,
        },
      });
      res
        .status(200)
        .json({ success: true, message: "user updated", UnfollowUser });
    }
    // res.status(200).json({ success: true, message: "user updated" });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
      message: "you are not authorized to perform this action",
    });
  }
};
