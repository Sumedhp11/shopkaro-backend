import { Types } from "mongoose";

export interface AddressInterface {
  street: string;
  landmark: string;
  city: string;
  state: string;
}

export interface UserInterface {
  _id?: Types.ObjectId;
  fullName: string | null;
  email: string | null;
  phone: number | null;
  password: string | null;
  isDeleted?: boolean | null;
  addresses: AddressInterface[] | null;
}
