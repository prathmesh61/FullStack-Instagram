import express from "express";
import { registerUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/createuser", registerUser);

module.exports = { route };
