import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://anuragisanurag:bT8RkruirDME6P3h@notesnest.jta2f23.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(4000))
  .then(() => console.log("Connected to DB"))
  .catch((err: any) => console.log(err));

console.log("Hello");