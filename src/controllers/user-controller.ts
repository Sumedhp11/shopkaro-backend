import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../interfaces/UserInterface.js";
import { ErrorHandler } from "../utils/ErrorClass.js";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

import { sendToken } from "../utils/helpers.js";
import Cart from "../models/cart-model.js";
import { AuthenticatedInterface } from "../middleware/auth-middleware.js";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return next(new ErrorHandler("Provide Credentials", 400));
    }
    const isUserWithEmail = await User.findOne({
      email,
    });
    if (isUserWithEmail) {
      return next(new ErrorHandler("User Already Exists", 400));
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = new User<UserInterface>({
      fullName,
      email,
      phone,
      password: hashedPw,
      addresses: [],
      isDeleted: false,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Provide Credentials", 400));
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new ErrorHandler("User Does not Exist", 400));
    }
    const pwMatch = await bcrypt.compare(password, existingUser.password!);
    if (!pwMatch) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    }
    sendToken(res, existingUser, 200, `Welcome Back ${existingUser.fullName}`);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

const profileController = async (
  req: AuthenticatedInterface,
  res: Response,
  next: NextFunction
) => {
  try {
    const [cart, user] = await Promise.all([
      Cart.findOne({ userId: req.userId }),
      User.findById(req.userId),
    ]);

    if (!cart) {
      return next(new ErrorHandler("Cart is Empty", 404));
    }
    return res.status(200).json({
      success: true,
      message: "User Retrieved Successfully",
      data: {
        user: user,
        cart: cart,
      },
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Error", 500));
  }
};
export { signupController, signinController, profileController };
