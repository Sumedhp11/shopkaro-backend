import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorClass.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface AuthenticatedInterface extends Request {
  userId?: Types.ObjectId;
}

const isAuthenticated = (
  req: AuthenticatedInterface,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["shopkaro-token"];
  console.log(token);

  if (!token) {
    return next(
      new ErrorHandler("You are Not Authenticated , Please Login!", 401)
    );
  }

  let decodedData: JwtPayload;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  if (!("_id" in decodedData)) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  req.userId = decodedData._id as Types.ObjectId;
  next();
};

export { isAuthenticated };
