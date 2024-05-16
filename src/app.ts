import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { connectDb } from "./utils/connectdb.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { Stripe } from "stripe";

//routes
import authRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import cartRouter from "./routes/cart-routes.js";
import paymentRouter from "./routes/payment-routes.js";
import orderRouter from "./routes/order-routes.js";

//middlewares
import { errorMiddleware } from "./middleware/error.js";
configDotenv();

export const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!);
const port = 8080;
const app = express();
connectDb();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("Api working!");
});
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
