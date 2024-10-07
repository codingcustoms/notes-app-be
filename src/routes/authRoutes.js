import { AuthController } from "../controllers/index.js";
import express from "express";
import { validatorMiddleWare } from "../middlewares/index.js";
import { signInSchema } from "../validations/index.js";

const router = express.Router();

router.post(
  "/signIn",
  validatorMiddleWare(signInSchema),
  AuthController.signIn,
);

export default router;
