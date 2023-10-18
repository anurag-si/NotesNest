import express from "express";
import { signUp } from "../Controllers/LoginSignup";

const userAccountRouter = express.Router();

userAccountRouter.post("/login");
userAccountRouter.post("/signup", signUp);
userAccountRouter.post("/logout");

export default userAccountRouter;