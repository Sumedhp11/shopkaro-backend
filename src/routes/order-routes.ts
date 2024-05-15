import express from "express";
import { getOrderByUserId, newOrder } from "../controllers/order-controller.js";

const Router = express.Router();

Router.post("/new-order", newOrder);
Router.get("/:userId", getOrderByUserId);

export default Router;
