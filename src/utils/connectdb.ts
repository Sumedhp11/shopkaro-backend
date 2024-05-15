import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URI!);
    console.log(db.connection.host);

    console.log(`Db Connected Successfully`);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
