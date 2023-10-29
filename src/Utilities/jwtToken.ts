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
  res.cookie("username", userId, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
  return res.cookie("authcookie", tokenGenerated, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
};

export const verifyToken = async (req: any, res: any, next: any) => {
  const token = await req.cookies.authcookie;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
    req.user = decoded; // Store the user information in the request
    console.log(req.user, "decoded");
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const passwordVerification = async (
  password: string,
  savedPassword: string
): Promise<boolean> => {
  const isPasswordCorrect = bcrypt.compareSync(password, savedPassword);

  if (isPasswordCorrect) {
    return isPasswordCorrect;
  } else {
    throw new Error("Incorrect Password");
  }
};
