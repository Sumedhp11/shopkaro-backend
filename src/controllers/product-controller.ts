import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/ErrorClass.js";
import Product from "../models/products-model.js";
import Category from "../models/category-model.js";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const searchQuery = req.query.search as string;
    const categoryId = req.query.categoryId as string;
    console.log(categoryId, 15);

    const limit = 10;
    const startIndex = (page - 1) * limit;
    const [products, TotalDocs] = await Promise.all([
      Product.find({
        ...(searchQuery
          ? { Product_name: { $regex: new RegExp(searchQuery, "i") } }
          : {}),
        ...(categoryId ? { categoryId: categoryId } : {}),
      })
        .skip(startIndex)
        .limit(limit),
      Product.countDocuments(),
    ]);

    if (!products || products.length < 1) {
      return next(new ErrorHandler("No Products Found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "All Products Retrieved Successfully",
      data: { products, TotalDocs },
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length < 1) {
      return next(new ErrorHandler("No Categories Found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Categories Retrieved Successfully",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};
const getRandomProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalCount = await Product.countDocuments();
    console.log(totalCount, "total Count");

    const randomIndexes: number[] = [];
    const maxIndex = totalCount - 10;

    while (randomIndexes.length < 10) {
      const randomIndex = Math.floor(Math.random() * maxIndex + 1);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    const randomProducts = await Product.find()
      .skip(randomIndexes[0])
      .limit(10);

    return res.status(200).json({
      success: true,
      message: "Products Retrieved Successfully",
      data: randomProducts,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Error", 500));
  }
};

export { getAllProducts, getAllCategories, getRandomProducts };
