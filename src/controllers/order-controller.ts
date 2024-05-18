import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorClass.js";
import Order from "../models/order-model.js";

const newOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, items, totalAmount, shippingAddress } = req.body;
    if (!userId) return next(new ErrorHandler("Provide UserId", 400));

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
    });
    const savednewOrder = await newOrder.save();
    return res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      data: savednewOrder,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

const getOrderByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(new ErrorHandler("Provide UserId", 400));
    const savedorder = await Order.findOne({
      userId,
    });
    if (!savedorder) {
      return res.status(200).json({
        success: true,
        message: "Order Retrivied Successully",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order Retrivied Successully",
      data: savedorder,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

export { newOrder, getOrderByUserId };
