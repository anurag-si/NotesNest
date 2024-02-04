import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { NextFunction, Response } from "express";
import { IUserCookie, IUserRequest } from "../Interfaces/User.interface";
import User from "../Models/User";
import Label from "../Models/Label";
import { Document } from "mongodb";

dotenv.config();

interface IUserDocument extends Document {}

class TokenUtils {
  static generateToken = async (userId: string, res: any) => {
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

  static verifyToken = async (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = await req.cookies.authcookie;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Token is missing." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret);
      req.user = decoded; // Store the user information in the request
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token." });
    }
  };

  static passwordVerification = async (
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

  static getUserId = async (req: IUserCookie): Promise<IUserDocument> => {
    const userEmail = req?.cookies?.username;

    try {
      if (userEmail) {
        const user: IUserDocument | null = await User.findOne({
          email: userEmail,
        }).exec();

        if (user) {
          return user;
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Username not provided in cookies");
      }
    } catch (error) {
      throw new Error("Could not find username " + error);
    }
  };

  static getLabel = async (id: string): Promise<IUserDocument> => {
    const labelId = id;

    try {
      if (labelId) {
        const label = await Label.findById(labelId).exec();

        if (label) {
          return label;
        } else {
          throw new Error("Label not found");
        }
      } else {
        throw new Error("Label ID not provided");
      }
    } catch (error) {
      throw new Error("Could not find Label " + error);
    }
  };
}

export default TokenUtils;
