import express from "express";
import User from "../../Models/User";
import bcrypt from "bcrypt";
import { IResponse, IUserSignup } from "../../Interfaces/User.interface";
import { generateToken } from "../../Utilities/jwtToken";

export const signUp = async (
  req: IUserSignup,
  res: any,
  next: any
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail)
      return res.status(409).json({ message: "Email Already Exists!" });
    if (existingUsername)
      return res.status(409).json({ message: "Username Already Exists!" });

    async function hashPassword(password: string): Promise<string> {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    }

    hashPassword(password)
      .then((hashedPassword: any) => {
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
        newUser
          .save()
          .then((result) => {
            generateToken(email, res);
            res.status(201).send({
              message: "Registration Successful",
              result,
            });
          })
          .catch((error) => {
            res.status(400).send({
              message: "User not created",
              error,
            });
          });
      })
      .catch((error: any) => {
        res.status(500).send({
          message: "Password not hashed",
          error,
        });
      });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
