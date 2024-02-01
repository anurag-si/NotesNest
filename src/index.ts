import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userAccountRouter from "./Routes/LoginSignupRoutes";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/notesnest", userAccountRouter);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => app.listen(4000))
  .then(() => console.log("Connected to DB"))
  .catch((err: any) => console.log(err));
