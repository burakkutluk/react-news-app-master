import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(userController.logoutUser);
router.route("/:id").get(userController.getAUser);
router
  .route("/home")
  .get(authMiddlewares.authenticateToken, userController.getHomePage);

export default router;