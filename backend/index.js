import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
// express app
const app = express();
// Port
const port = 7000;

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
