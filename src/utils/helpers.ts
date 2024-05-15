import { CookieOptions, Response } from "express";
import { UserInterface } from "../interfaces/UserInterface.js";
import jwt from "jsonwebtoken";
const cookieOption: CookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const sendToken = (
  res: Response,
  user: UserInterface,
  statusCode: number,
  message: string
) => {
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
