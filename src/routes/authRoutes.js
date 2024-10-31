import express from 'express';
import { AuthController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/index.js';
import { signInSchema, signUpSchema } from '../validations/index.js';

const router = express.Router();

router.post(
  '/signIn',
  validatorMiddleWare(signInSchema),
  AuthController.signIn,
);

router.post(
  '/signUp',
  validatorMiddleWare(signUpSchema),
  AuthController.signUp,
);

router.post('/social', AuthController.socialAuth);

export default router;
