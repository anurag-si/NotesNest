import express from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const createToken = (userId: string): string => {
  const secretKey = process.env.JWTSECRETKEY as Secret;
  const token: string = jwt.sign({ userId }, secretKey);
  return token;
};

export const storeToken = (userId: any, res: any, next?: any) => {
  const tokenGenerated = createToken(userId);
  console.log(tokenGenerated, "token")
  return res.cookie("authcookie", tokenGenerated, {
    maxAge: 900000,
    httpOnly: true,
  });
};
