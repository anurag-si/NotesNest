import express from "express";
import { login } from "../Controllers/User/Login";
import { signUp } from "../Controllers/User/SignUp";

const userAccountRouter = express.Router();

userAccountRouter.post("/login", login);
userAccountRouter.post("/signup", signUp);
userAccountRouter.post("/logout");

export default userAccountRouter;
