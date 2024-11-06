import express from 'express';
import { AuthController, UserController } from '../controllers/index.js';
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
  UserController.createUser,
);

router.post('/social', AuthController.socialAuth);

router.post('logout', AuthController.logOut);

export default router;
