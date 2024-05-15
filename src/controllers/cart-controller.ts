import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorClass.js";
import Cart from "../models/cart-model.js";

const addtoCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId) return next(new ErrorHandler("User not Found", 400));

    let savedCart = await Cart.findOne({ userId });

    if (savedCart) {
      const existingProduct = savedCart.items.find(
        (item: any) => String(item.productId) === productId
      );

      if (existingProduct && Number(quantity) > 0) {
        existingProduct.quantity = quantity;
      } else if (existingProduct && Number(quantity) === 0) {
        savedCart.items = savedCart.items.filter(
          (item: any) => String(item.productId) !== String(productId)
        );
      } else if (!existingProduct && Number(quantity) > 0) {
        const newItem = {
          productId,
          quantity: 1,
        };
        savedCart.items.push(newItem);
      }

      savedCart = await savedCart.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        data: savedCart,
      });
    }

    const newCart = new Cart({
      userId,
      items: [{ productId, quantity }],
    });

    const newSavedCart = await newCart.save();

    return res.status(201).json({
      success: true,
      message: "Cart Created Successfully",
      data: newSavedCart,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

const getCartbyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return next(new ErrorHandler("Please Provide Credentials", 400));

    const savedCart = await Cart.findOne({
      userId,
    });

    if (!savedCart)
      return res.status(200).json({
        success: true,
        message: "No Cart Found",
        data: [],
      });
    return res.status(200).json({
      success: true,
      message: "Cart Retrieved Successfully",
      data: savedCart,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Internal Error", 500));
  }
};
export { addtoCart, getCartbyUserId };
