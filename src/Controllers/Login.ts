import express from "express";
import User from "../Models/User";
import { IResponse, IUserLogin } from "../Interfaces/User.interface";
import { passwordVerification, generateToken } from "../Utilities/jwtToken";
import { ValidateEmail } from "../Utilities/regex";

export const login = async (
  req: IUserLogin,
  res: any,
  next: any
): Promise<void> => {
  const { userId, password } = req.body;

  try {
    //Check if Email entered or Username
    if (ValidateEmail(userId)) {
      const existingEmail = await User.findOne({ email: userId });

      if (!existingEmail) {
        return res.status(404).json({ message: "Email not found" });
      }

      passwordVerification(password, existingEmail.password)
        .then(() => {
          generateToken(userId, res);
          res.status(200).json({ message: "Login Success" });
        })
        .catch((error) => {
          res.status(401).send({
            message: "Password Incorrect",
          });
        });
    } else {
      const existingUsername = await User.findOne({ username: userId });
      if (!existingUsername) {
        return res.status(404).json({ message: "Username not found" });
      }

      passwordVerification(password, existingUsername.password)
        .then(() => {
          generateToken(userId, res);
          res.status(200).json({ message: "Login Success" });
        })
        .catch((error) => {
          res.status(401).send({
            message: "Password Incorrect",
          });
        });
    }
  } catch (error: any) {
    res.status(400).send({
      message: "Internal Server Error",
    });
  }
};
