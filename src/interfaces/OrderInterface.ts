import { Schema } from "mongoose";

export interface OrderInterface {
  userId: Schema.Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  deliveryStatus: string;
}

export interface OrderItem {
  productId: Schema.Types.ObjectId;
  quantity: number;
}
