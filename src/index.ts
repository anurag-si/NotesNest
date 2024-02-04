import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userAccountRouter from "./Routes/User.routes";
import labelRoutes from "./Routes/Label.routes";
import cookieParser from "cookie-parser";
import homeRoutes from "./Routes/Home.routes";
import noteRoutes from "./Routes/Note.routes";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/auth", userAccountRouter);
app.use("/label", labelRoutes);
app.use("/note", noteRoutes);
app.use("/", homeRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => app.listen(4000))
  .then(() => console.log("Connected to DB, Listening on PORT 4000"))
  .catch((err: any) => console.log(err));
