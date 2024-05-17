import { CookieOptions, Response, Request } from "express";
import { UserInterface } from "../interfaces/UserInterface.js";
import jwt from "jsonwebtoken";

const sendToken = (
  req: Request, // Add req parameter to access request headers
  res: Response,
  user: UserInterface,
  statusCode: number,
  message: string
) => {
  const origin = req.get("Origin");
  const isLocalhost = origin?.includes("localhost");

  const cookieOption: CookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
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
