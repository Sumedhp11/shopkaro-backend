import { Document, Schema } from "mongoose";

export interface CartItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

export interface Cart extends Document {
  userId: Schema.Types.ObjectId;
  items: CartItem[];
}
