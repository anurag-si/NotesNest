import * as express from "express";
import { Login } from "../Controllers";
import { SignUp } from "../Controllers";

const userAccountRouter = express.Router();

userAccountRouter.post("/v1/auth/login", Login);
userAccountRouter.post("/v1/auth/signup", SignUp);

export default userAccountRouter;
