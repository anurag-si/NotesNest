import express from "express";

const userAccountRouter = express.Router();

userAccountRouter.post("/login");
userAccountRouter.post("/signup");
userAccountRouter.post("/logout");

export default userAccountRouter;