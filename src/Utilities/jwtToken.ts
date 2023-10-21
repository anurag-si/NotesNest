import express from "express";
import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const createToken = (email: string): string => {
  const secretKey = process.env.JWTSECRETKEY as Secret;
  const token: string = jwt.sign({ email }, secretKey);
  return token;
};

export const storeToken = (email: any, res: any, next?: any) => {
  const tokenGenerated = createToken(email);
  return res.cookie("authcookie", tokenGenerated, {
    maxAge: 900000,
    httpOnly: true,
  });
};
