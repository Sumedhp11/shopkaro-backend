import express from "express";
import {
  getAllProducts,
  getAllCategories,
  getRandomProducts,
} from "../controllers/product-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const Router = express.Router();

Router.use(isAuthenticated);
Router.get("/all", getAllProducts);
Router.get("/random-products", getRandomProducts);
Router.get("/categories", getAllCategories);

export default Router;
