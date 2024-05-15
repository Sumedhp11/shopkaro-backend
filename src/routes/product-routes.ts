import express from "express";
import {
  getAllProducts,
  getAllCategories,
} from "../controllers/product-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const Router = express.Router();

Router.use(isAuthenticated);
Router.get("/all", getAllProducts);
Router.get("/categories", getAllCategories);

export default Router;
