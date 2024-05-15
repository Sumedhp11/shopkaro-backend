import express from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";
import { addtoCart, getCartbyUserId } from "../controllers/cart-controller.js";

const Router = express.Router();

Router.use(isAuthenticated);
Router.post("/add-to-cart", addtoCart);
Router.get("/get-cart/:userId", getCartbyUserId);

export default Router;
