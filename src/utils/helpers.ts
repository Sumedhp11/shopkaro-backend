import { CookieOptions, Request, Response } from "express";
import { UserInterface } from "../interfaces/UserInterface.js";
import jwt from "jsonwebtoken";

const sendToken = (
  req: Request,
  res: Response,
  user: UserInterface,
  statusCode: number,
  message: string
) => {
  const origin = req.get("Origin");
  const isLocalhost = origin?.includes("localhost");
  const cookieOption: CookieOptions = {
    httpOnly: true,
    secure: !isLocalhost,
  };
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
  return res
    .status(statusCode)
    .cookie("shopkaro-token", token, cookieOption)
    .json({
      success: true,
      message,
      data: user,
    });
};

export { sendToken };
