import { CookieOptions, Response } from "express";
import { UserInterface } from "../interfaces/UserInterface.js";
import jwt from "jsonwebtoken";
const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
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
