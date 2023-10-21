import express from "express";
import { login } from "../Controllers/Login";
import { signUp } from "../Controllers/SignUp";

const userAccountRouter = express.Router();

userAccountRouter.post("/login", login);
userAccountRouter.post("/signup", signUp);
userAccountRouter.post("/logout");

export default userAccountRouter;
