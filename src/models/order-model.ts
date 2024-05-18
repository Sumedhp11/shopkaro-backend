import { Schema, model } from "mongoose";
import { OrderInterface } from "../interfaces/OrderInterface.js";

const orderSchema = new Schema<OrderInterface>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: ["Placed", "Delivered", "Shipped"],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
