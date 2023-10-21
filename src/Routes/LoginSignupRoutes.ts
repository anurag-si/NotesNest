import express from "express";
import { login, signUp } from "../Controllers/LoginSignup";

const userAccountRouter = express.Router();

userAccountRouter.post("/login", login);
userAccountRouter.post("/signup", signUp);
userAccountRouter.post("/logout");

export default userAccountRouter;