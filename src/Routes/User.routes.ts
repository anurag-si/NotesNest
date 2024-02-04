import * as express from "express";
import { Login } from "../Controllers";
import { SignUp } from "../Controllers";

const userRouter = express.Router();

userRouter.post("/v1/login", Login);
userRouter.post("/v1/signup", SignUp);

export default userRouter;
