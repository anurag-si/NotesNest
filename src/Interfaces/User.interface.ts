import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUserSignup {
  body: {
    username: string;
    email: string;
    password: string;
    createdAt?: string;
  };
}

export interface IUserLogin {
  body: {
    userId: string;
    password: string;
  };
}

export interface IResponse {
  message: string;
}

export interface IUserRequest extends Request {
  user: string | JwtPayload;
}

export interface IUserCookie extends Request {
  username: string;
  authcookie: string;
}
