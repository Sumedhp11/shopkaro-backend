import { Schema, model } from "mongoose";
import { ProductInterface } from "../interfaces/ProductsInterface.js";

const ProductSchema = new Schema<ProductInterface>(
  {
    Product_name: {
      type: String,
      required: true,
    },
    Product_img: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);
export default Product;
