import mongoose from "mongoose";
import {
  AddressInterface,
  UserInterface,
} from "../interfaces/UserInterface.js";

const AddressSchema = new mongoose.Schema<AddressInterface>(
  { landmark: String, street: String, city: String, state: String },
  { _id: false }
);

const UserSchema = new mongoose.Schema<UserInterface>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [AddressSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
export default User;
