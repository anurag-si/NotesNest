import { Request } from "express";

export interface IRequest extends Request {
  params: {
    id: any;
  };
}
