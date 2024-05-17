import express from "express";
import {
  logoutController,
  profileController,
  signinController,
  signupController,
} from "../controllers/user-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const Router = express.Router();

Router.post("/sign-up", signupController);
Router.post("/sign-in", signinController);

// with middleware
Router.use(isAuthenticated);
Router.get("/me", profileController);
Router.get("/logout", logoutController);

export default Router;
