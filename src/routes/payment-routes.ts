import express from "express";
import { isAuthenticated } from "../middleware/auth-middleware.js";
import { createIntent } from "../controllers/Payment-controller.js";

const Router = express.Router();
Router.use(isAuthenticated);
Router.post("/create", createIntent);

export default Router;
