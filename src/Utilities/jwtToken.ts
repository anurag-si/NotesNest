import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const generateToken = async (userId: any, res: any, next?: any) => {
  const tokenGenerated: string = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY as Secret
  );
  return res.cookie("authcookie", tokenGenerated, {
    maxAge: 10000,
    httpOnly: true,
  });
};

export const passwordVerification = async (
  password: string,
  savedPassword: string
): Promise<boolean> => {
  const isPasswordCorrect = bcrypt.compareSync(password, savedPassword);
  return isPasswordCorrect;
};
