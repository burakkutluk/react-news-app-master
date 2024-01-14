import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/register").post(userController.createUser);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(authMiddlewares.authenticateToken,userController.logoutUser);
router.route("/getUser").get(authMiddlewares.authenticateToken, userController.getUser);

export default router;