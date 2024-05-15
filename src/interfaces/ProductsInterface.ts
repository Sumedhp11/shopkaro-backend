import { Types } from "mongoose";
export interface ProductInterface {
  Product_name: string;
  Product_img: string;
  Price: number;

  categoryId: Types.ObjectId;
}
