import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorClass.js";
import { stripeInstance } from "../app.js";

const createIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount } = req.body;
    console.log(amount);

    if (!amount) return next(new ErrorHandler("Please enter amount", 400));
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Number(amount),
      currency: "inr",
    });
    return res.status(201).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

export { createIntent };
